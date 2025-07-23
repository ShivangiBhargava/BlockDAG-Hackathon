
import React from "react";
import { cn } from "@/lib/utils";

interface ProgressBarProps {
  progress: number;
  className?: string;
  showPercentage?: boolean;
  label?: string;
}

export const ProgressBar = ({ 
  progress, 
  className, 
  showPercentage = false,
  label 
}: ProgressBarProps) => {
  return (
    <div className={cn("w-full", className)}>
      {label && (
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-700">{label}</span>
          {showPercentage && (
            <span className="text-sm text-gray-500">{Math.round(progress)}%</span>
          )}
        </div>
      )}
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div 
          className="bg-gradient-to-r from-purple-600 to-blue-600 h-2 rounded-full transition-all duration-300 ease-out"
          style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
        />
      </div>
    </div>
  );
};
