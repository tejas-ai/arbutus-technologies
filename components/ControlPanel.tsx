import React from 'react';
import { Mic, Video, Monitor, Power, Activity } from 'lucide-react';
import { ConnectionState } from '../types';

interface ControlPanelProps {
  connectionState: ConnectionState;
  onConnect: () => void;
  onDisconnect: () => void;
  onToggleCamera: () => void;
  onToggleScreen: () => void;
  isVideoActive: boolean;
  isScreenActive: boolean;
}

export const ControlPanel: React.FC<ControlPanelProps> = ({
  connectionState,
  onConnect,
  onDisconnect,
  onToggleCamera,
  onToggleScreen,
  isVideoActive,
  isScreenActive
}) => {
  const isConnected = connectionState === ConnectionState.CONNECTED;

  return (
    <div className="flex items-center gap-4 bg-zinc-900/80 backdrop-blur-md p-4 rounded-2xl border border-white/5 shadow-2xl">
      <button
        onClick={isConnected ? onDisconnect : onConnect}
        className={`p-4 rounded-full transition-all duration-300 flex items-center justify-center ${
          isConnected 
            ? 'bg-red-500/10 text-red-400 hover:bg-red-500/20 hover:scale-105' 
            : 'bg-white text-black hover:bg-zinc-200 hover:scale-105'
        }`}
        title={isConnected ? "Disconnect" : "Connect Loona"}
      >
        <Power size={24} />
      </button>

      <div className="h-8 w-px bg-white/10 mx-2" />

      <button
        onClick={onToggleCamera}
        disabled={!isConnected}
        className={`p-3 rounded-xl transition-all ${
          isVideoActive 
            ? 'bg-emerald-500/20 text-emerald-400' 
            : 'bg-zinc-800 text-zinc-500 hover:text-zinc-300'
        } disabled:opacity-50 disabled:cursor-not-allowed`}
        title="Toggle Camera Vision"
      >
        <Video size={20} />
      </button>

      <button
        onClick={onToggleScreen}
        disabled={!isConnected}
        className={`p-3 rounded-xl transition-all ${
          isScreenActive 
            ? 'bg-blue-500/20 text-blue-400' 
            : 'bg-zinc-800 text-zinc-500 hover:text-zinc-300'
        } disabled:opacity-50 disabled:cursor-not-allowed`}
        title="Share Screen Context"
      >
        <Monitor size={20} />
      </button>

      <div className="ml-4 flex items-center gap-2 text-xs font-mono text-zinc-500">
        <Activity size={14} className={isConnected ? "text-emerald-500 animate-pulse" : ""} />
        {connectionState}
      </div>
    </div>
  );
};
