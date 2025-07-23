
import React from 'react';
import { cn } from '@/lib/utils';
import { AlertTriangle, Shield, ShieldAlert } from 'lucide-react';

interface RiskBadgeProps {
  score: number;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

const RiskBadge = ({ score, className, size = 'md' }: RiskBadgeProps) => {
  const getRiskLevel = (score: number) => {
    if (score >= 8) return 'danger';
    if (score >= 6) return 'warning';
    if (score >= 4) return 'medium';
    return 'safe';
  };

  const getRiskIcon = (level: string) => {
    switch (level) {
      case 'danger':
        return <AlertTriangle className="w-4 h-4" />;
      case 'warning':
        return <ShieldAlert className="w-4 h-4" />;
      default:
        return <Shield className="w-4 h-4" />;
    }
  };

  const getRiskEmoji = (level: string) => {
    switch (level) {
      case 'danger':
        return '🚨';
      case 'warning':
        return '⚠️';
      case 'medium':
        return '🔍';
      default:
        return '✅';
    }
  };

  const riskLevel = getRiskLevel(score);
  const riskIcon = getRiskIcon(riskLevel);
  const riskEmoji = getRiskEmoji(riskLevel);

  const baseClasses = cn(
    'inline-flex items-center gap-2 rounded-full font-semibold transition-colors duration-300',
    {
      // Size variants
      'px-2 py-1 text-xs': size === 'sm',
      'px-3 py-1.5 text-sm': size === 'md',
      'px-4 py-2 text-base': size === 'lg',
      
      // Risk level colors
      'bg-red-100 text-red-800 border border-red-200': riskLevel === 'danger',
      'bg-orange-100 text-orange-800 border border-orange-200': riskLevel === 'warning',
      'bg-yellow-100 text-yellow-800 border border-yellow-200': riskLevel === 'medium',
      'bg-green-100 text-green-800 border border-green-200': riskLevel === 'safe',
    },
    className
  );

  return (
    <div className={baseClasses}>
      <span className="text-base leading-none">{riskEmoji}</span>
      {size !== 'sm' && riskIcon}
      <span className="font-bold">
        Risk: {score}/10
      </span>
      {size === 'lg' && (
        <span className="ml-1 text-xs opacity-75 capitalize">
          ({riskLevel})
        </span>
      )}
    </div>
  );
};

export default RiskBadge;
