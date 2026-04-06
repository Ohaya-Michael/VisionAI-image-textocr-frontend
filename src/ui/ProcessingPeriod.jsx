import React from 'react';
import Spinner from './spinner';

/**
 * ProcessingPeriod - A card component for "In-Progress" states
 * @param {string} title - The name of the process (e.g., "Monthly Data Sync")
 * @param {string} subtitle - Secondary info (e.g., "Updating records for October...")
 * @param {number} progress - Optional percentage (0-100)
 */
export const ProcessingPeriod = ({ 
  title = "Processing Data Period", 
  subtitle = "Aggregating logs and calculating metrics...",
  progress 
}) => {
  return (
    <div className="bg-[#161b22] border border-slate-800 p-6 rounded-2xl flex flex-col items-center justify-center text-center min-h-[200px] relative overflow-hidden">
      
      {/* Background Decorative Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-32 bg-blue-600/10 blur-[50px] rounded-full"></div>

      <div className="relative z-10 flex flex-col items-center">
        {/* Spinning Icon Container */}
        <div className="mb-4 relative">
          <Spinner size="text-4xl" color="text-blue-500" />
          {/* Static center dot for visual stability */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-1.5 h-1.5 bg-blue-400 rounded-full"></div>
          </div>
        </div>

        <h3 className="text-white font-bold mb-1">{title}</h3>
        <p className="text-xs text-slate-500 max-w-[200px] leading-relaxed">
          {subtitle}
        </p>

        {/* Optional Progress Bar */}
        {progress !== undefined && (
          <div className="mt-6 w-48">
            <div className="flex justify-between mb-1">
              <span className="text-[10px] font-bold text-slate-600 uppercase">Progress</span>
              <span className="text-[10px] font-bold text-blue-400">{progress}%</span>
            </div>
            <div className="h-1 w-full bg-slate-800 rounded-full overflow-hidden">
              <div 
                className="h-full bg-blue-600 transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
