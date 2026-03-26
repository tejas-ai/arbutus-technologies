import { useState, useRef, useEffect, useCallback } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';

// Fallback types for Multimodal Live API which might be missing in the current SDK version
type LiveServerMessage = any;
type Modality = any;
const Modality = { AUDIO: 'audio' as any };

import { ConnectionState, ToolCallLog } from '../types';
import { TOOLS, SYSTEM_INSTRUCTION } from '../constants';
import { createPcmBlob, base64ToUint8Array, decodeAudioData, blobToBase64 } from '../services/audioUtils';
import { executeMockTool } from '../services/mockTools';

interface UseLoonaProps {
  apiKey: string;
}

export function useLoona({ apiKey }: UseLoonaProps) {
  const [connectionState, setConnectionState] = useState<ConnectionState>(ConnectionState.DISCONNECTED);
  const [volume, setVolume] = useState({ input: 0, output: 0 });
  const [toolLogs, setToolLogs] = useState<ToolCallLog[]>([]);
  const [isVideoActive, setIsVideoActive] = useState(false);
  const [isScreenShareActive, setIsScreenShareActive] = useState(false);

  // Audio Contexts
  const audioContextRef = useRef<AudioContext | null>(null);
  const outputContextRef = useRef<AudioContext | null>(null);
  const nextStartTimeRef = useRef<number>(0);
  const sourcesRef = useRef<Set<AudioBufferSourceNode>>(new Set());
  
  // Stream References
  const mediaStreamRef = useRef<MediaStream | null>(null);
  const screenStreamRef = useRef<MediaStream | null>(null);
  const videoIntervalRef = useRef<number | null>(null);

  // Gemini API
  const sessionRef = useRef<any>(null); // To hold the active session

  // Tool Log Helper
  const addToolLog = (log: ToolCallLog) => {
    setToolLogs(prev => [log, ...prev]);
  };

  const updateToolLogResult = (id: string, result: any) => {
    setToolLogs(prev => prev.map(log => 
      log.id === id ? { ...log, status: 'completed', result } : log
    ));
  };

  // Cleanup Function
  const cleanup = useCallback(() => {
    if (videoIntervalRef.current) clearInterval(videoIntervalRef.current);
    
    // Stop all audio sources
    sourcesRef.current.forEach(source => {
        try { source.stop(); } catch (e) {}
    });
    sourcesRef.current.clear();

    // Close contexts
    if (audioContextRef.current) audioContextRef.current.close();
    if (outputContextRef.current) outputContextRef.current.close();
    
    // Stop tracks
    if (mediaStreamRef.current) mediaStreamRef.current.getTracks().forEach(t => t.stop());
    if (screenStreamRef.current) screenStreamRef.current.getTracks().forEach(t => t.stop());

    // Close session
    if (sessionRef.current) {
        // There isn't a documented close() method on the session object in the provided guidelines, 
        // but we should reset the ref. The API seems to handle disconnects via standard websocket closure.
        // If there was a close method we would call it.
        sessionRef.current = null;
    }

    setConnectionState(ConnectionState.DISCONNECTED);
    setIsVideoActive(false);
    setIsScreenShareActive(false);
  }, []);

  const connect = async () => {
    try {
      setConnectionState(ConnectionState.CONNECTING);
      const ai = new GoogleGenerativeAI(apiKey) as any;

      // Initialize Audio Contexts
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 16000 });
      outputContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
      
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaStreamRef.current = stream;

      // Setup Input Audio Pipeline
      const source = audioContextRef.current.createMediaStreamSource(stream);
      // Using ScriptProcessor as per guidelines for raw PCM access
      const processor = audioContextRef.current.createScriptProcessor(4096, 1, 1);
      
      processor.onaudioprocess = (e) => {
        const inputData = e.inputBuffer.getChannelData(0);
        // Calculate volume for visualizer
        let sum = 0;
        for (let i = 0; i < inputData.length; i++) sum += inputData[i] * inputData[i];
        const rms = Math.sqrt(sum / inputData.length);
        setVolume(prev => ({ ...prev, input: rms }));

        // Send to model
        if (connectionState === ConnectionState.CONNECTED || connectionState === ConnectionState.CONNECTING) {
             const pcmBlob = createPcmBlob(inputData);
             // Ensure session exists
             if (sessionRef.current) {
                sessionRef.current.sendRealtimeInput({ media: pcmBlob });
             }
        }
      };

      source.connect(processor);
      processor.connect(audioContextRef.current.destination);

      // Connect to Gemini Live
      const sessionPromise = ai.live.connect({
        model: 'gemini-2.5-flash-native-audio-preview-12-2025',
        callbacks: {
          onopen: () => {
            console.log('Gemini Live Session Opened');
            setConnectionState(ConnectionState.CONNECTED);
            sessionPromise.then((s: any) => sessionRef.current = s);
          },
          onmessage: async (message: LiveServerMessage) => {
            // Handle Audio Output
            const base64Audio = message.serverContent?.modelTurn?.parts?.[0]?.inlineData?.data;
            if (base64Audio) {
              if (outputContextRef.current) {
                const audioBuffer = await decodeAudioData(
                  base64ToUint8Array(base64Audio),
                  outputContextRef.current,
                  24000
                );
                
                // Visualizer for output
                const channelData = audioBuffer.getChannelData(0);
                let sum = 0;
                for(let i=0; i<channelData.length; i++) sum += channelData[i]*channelData[i];
                const rms = Math.sqrt(sum/channelData.length);
                setVolume(prev => ({...prev, output: rms}));

                // Play Audio
                const source = outputContextRef.current.createBufferSource();
                source.buffer = audioBuffer;
                source.connect(outputContextRef.current.destination);
                
                // Scheduling
                nextStartTimeRef.current = Math.max(nextStartTimeRef.current, outputContextRef.current.currentTime);
                source.start(nextStartTimeRef.current);
                nextStartTimeRef.current += audioBuffer.duration;
                
                sourcesRef.current.add(source);
                source.onended = () => sourcesRef.current.delete(source);
              }
            }

            // Handle Interruptions
            if (message.serverContent?.interrupted) {
              sourcesRef.current.forEach(s => s.stop());
              sourcesRef.current.clear();
              nextStartTimeRef.current = 0;
            }

            // Handle Tool Calls
            if (message.toolCall) {
                sessionPromise.then(async (session: any) => {
                    const responses = [];
                    for (const fc of message.toolCall!.functionCalls) {
                        const result = await executeMockTool(fc.name, fc.args, addToolLog);
                        // Update UI log to show completed
                        // We find the log we just created. Since executeMockTool is async and we just called it, 
                        // we can't easily get the ID back synchronously inside the loop without refactoring.
                        // However, executeMockTool adds the "pending" log. 
                        // Let's assume the latest pending log for this tool is the one.
                        // Actually, simplified: executeMockTool will handle "pending".
                        // We need to update it to "completed" here.
                        setToolLogs(prev => {
                            const newLogs = [...prev];
                            const logIndex = newLogs.findIndex(l => l.toolName === fc.name && l.status === 'pending');
                            if (logIndex !== -1) {
                                newLogs[logIndex] = { ...newLogs[logIndex], status: 'completed', result };
                            }
                            return newLogs;
                        });

                        responses.push({
                            id: fc.id,
                            name: fc.name,
                            response: { result }
                        });
                    }
                    session.sendToolResponse({ functionResponses: responses });
                });
            }
          },
          onclose: () => {
            console.log('Session closed');
            setConnectionState(ConnectionState.DISCONNECTED);
          },
          onerror: (e: any) => {
            console.error(e);
            setConnectionState(ConnectionState.ERROR);
          }
        },
        config: {
          responseModalities: [Modality.AUDIO],
          speechConfig: {
            voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Puck' } }
          },
          systemInstruction: SYSTEM_INSTRUCTION,
          tools: [{ functionDeclarations: TOOLS }]
        }
      });

    } catch (error) {
      console.error("Connection failed", error);
      setConnectionState(ConnectionState.ERROR);
    }
  };

  // Video/Screen Streaming
  const startVideo = useCallback(async (type: 'camera' | 'screen') => {
    try {
        let stream: MediaStream;
        if (type === 'camera') {
            stream = await navigator.mediaDevices.getUserMedia({ video: { width: 640, height: 480 } });
            setIsVideoActive(true);
        } else {
            stream = await navigator.mediaDevices.getDisplayMedia({ video: { width: 1280, height: 720 } });
            setIsScreenShareActive(true);
            screenStreamRef.current = stream;
        }

        const videoEl = document.createElement('video');
        videoEl.srcObject = stream;
        await videoEl.play();
        
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        
        const interval = window.setInterval(async () => {
             if (ctx && sessionRef.current && videoEl.readyState === 4) {
                 canvas.width = videoEl.videoWidth;
                 canvas.height = videoEl.videoHeight;
                 ctx.drawImage(videoEl, 0, 0);
                 
                 canvas.toBlob(async (blob) => {
                    if (blob) {
                        const base64 = await blobToBase64(blob);
                        sessionRef.current.sendRealtimeInput({
                            media: { mimeType: 'image/jpeg', data: base64 }
                        });
                    }
                 }, 'image/jpeg', 0.6);
             }
        }, 1000); // 1 FPS for efficiency in demo
        
        videoIntervalRef.current = interval;

    } catch (e) {
        console.error("Failed to start video", e);
        if(type === 'screen') setIsScreenShareActive(false);
        if(type === 'camera') setIsVideoActive(false);
    }
  }, []);

  return {
    connect,
    cleanup,
    connectionState,
    volume,
    toolLogs,
    isVideoActive,
    isScreenShareActive,
    startVideo
  };
}
