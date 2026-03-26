import React, { useMemo } from 'react';

interface AvatarProps {
  inputVolume: number;
  outputVolume: number;
  isActive: boolean;
}

export const Avatar: React.FC<AvatarProps> = ({ inputVolume, outputVolume, isActive }) => {
  // Smooth out volume for animation
  const scale = useMemo(() => {
    if (!isActive) return 1;
    const maxVol = Math.max(inputVolume, outputVolume);
    // Amplify small signals
    return 1 + Math.min(maxVol * 3, 0.5); 
  }, [inputVolume, outputVolume, isActive]);

  const glowColor = outputVolume > 0.01 ? 'rgba(167, 139, 250, 0.8)' : 'rgba(56, 189, 248, 0.6)'; // Purple when speaking, Blue when listening/idle

  return (
    <div className="relative flex items-center justify-center w-64 h-64">
      {/* Outer Glow Ring */}
      <div 
        className="absolute rounded-full transition-all duration-100 ease-out blur-xl"
        style={{
          width: '100%',
          height: '100%',
          backgroundColor: isActive ? glowColor : 'rgba(100,100,100,0.1)',
          transform: `scale(${scale * 1.2})`,
          opacity: isActive ? 0.4 : 0.1
        }}
      />
      
      {/* Core Orb */}
      <div 
        className="absolute rounded-full transition-all duration-75 ease-out shadow-lg backdrop-blur-sm border border-white/10"
        style={{
          width: '140px',
          height: '140px',
          background: `radial-gradient(circle at 30% 30%, rgba(255,255,255,0.1), rgba(0,0,0,0.8))`,
          boxShadow: `0 0 ${20 * scale}px ${isActive ? glowColor : '#333'}`,
          transform: `scale(${scale})`
        }}
      >
        {/* Inner texture/eye simulation */}
        <div className="absolute inset-0 rounded-full overflow-hidden">
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-gradient-to-tr from-transparent to-white/20 opacity-30 animate-pulse" />
        </div>
      </div>

      {/* Connection State Indicator (Small dot in center) */}
      {!isActive && (
        <div className="absolute z-10 text-xs text-zinc-500 font-mono tracking-widest uppercase">
            Offline
        </div>
      )}
    </div>
  );
};
