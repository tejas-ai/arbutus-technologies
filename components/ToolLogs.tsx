import React, { useEffect, useRef } from 'react';
import { ToolCallLog } from '../types';
import { CheckCircle2, Clock, Terminal, Mail, Calendar, Search, Utensils } from 'lucide-react';

interface ToolLogsProps {
  logs: ToolCallLog[];
}

export const ToolLogs: React.FC<ToolLogsProps> = ({ logs }) => {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (logs.length > 0) {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [logs]);

  const getIcon = (name: string) => {
    if (name.includes('Email') || name.includes('Draft')) return <Mail size={14} />;
    if (name.includes('Meeting')) return <Calendar size={14} />;
    if (name.includes('Slack')) return <Search size={14} />;
    if (name.includes('Restaurant')) return <Utensils size={14} />;
    return <Terminal size={14} />;
  };

  return (
    <div className="w-full max-w-md h-full flex flex-col bg-zinc-900/50 rounded-2xl border border-white/5 overflow-hidden backdrop-blur-sm">
      <div className="p-4 border-b border-white/5 bg-zinc-900/80 flex items-center justify-between">
        <h3 className="font-display font-medium text-sm text-zinc-300 flex items-center gap-2">
            <Terminal size={16} className="text-purple-400" />
            System Activity
        </h3>
        <span className="text-xs text-zinc-600 font-mono">{logs.length} events</span>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-3 relative">
        {logs.length === 0 && (
            <div className="absolute inset-0 flex items-center justify-center text-zinc-700 text-sm italic">
                Waiting for tool requests...
            </div>
        )}
        {logs.map((log) => (
          <div key={log.id} className="text-xs font-mono bg-zinc-950/50 border border-white/5 rounded-lg p-3 animate-in fade-in slide-in-from-bottom-2 duration-300">
            <div className="flex items-center justify-between mb-2">
              <span className={`flex items-center gap-2 font-bold ${log.status === 'completed' ? 'text-emerald-400' : 'text-amber-400'}`}>
                {getIcon(log.toolName)}
                {log.toolName}
              </span>
              <span className="text-zinc-600">{log.timestamp.toLocaleTimeString()}</span>
            </div>
            
            <div className="space-y-1">
                <div className="text-zinc-400 break-all">
                   <span className="text-zinc-600 mr-1">$</span>
                   {JSON.stringify(log.args).slice(0, 100)}{JSON.stringify(log.args).length > 100 ? '...' : ''}
                </div>
                {log.status === 'completed' && log.result && (
                     <div className="mt-2 pl-2 border-l-2 border-zinc-800 text-zinc-500 italic">
                        {JSON.stringify(log.result).slice(0, 150)}{JSON.stringify(log.result).length > 150 ? '...' : ''}
                     </div>
                )}
                {log.status === 'pending' && (
                    <div className="flex items-center gap-2 text-amber-500/50 mt-1">
                        <Clock size={10} className="animate-spin" />
                        Processing...
                    </div>
                )}
                 {log.status === 'completed' && (
                    <div className="flex items-center gap-2 text-emerald-500/50 mt-1">
                        <CheckCircle2 size={10} />
                        Completed
                    </div>
                )}
            </div>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>
    </div>
  );
};
