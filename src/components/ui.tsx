import React, { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  key?: React.Key | null;
}

export function Card({ children, className = '', onClick }: CardProps) {
  return (
    <div 
      onClick={onClick}
      className={`glass rounded-2xl p-5 ${onClick ? 'cursor-pointer hover:bg-white/10 transition-all' : ''} ${className}`}
    >
      {children}
    </div>
  );
}

export function SectionTitle({ title, subtitle, hideBack }: { title: string; subtitle?: string; hideBack?: boolean }) {
  const navigate = useNavigate();
  return (
    <div className="mb-6 flex items-start gap-4">
      {!hideBack && (
        <button 
          onClick={() => navigate(-1)} 
          className="mt-1 p-2 rounded-full bg-white/5 hover:bg-white/10 text-white/70 hover:text-white transition-colors border border-white/10"
        >
          <ArrowLeft size={20} />
        </button>
      )}
      <div>
        <h2 className="text-2xl font-serif font-bold gold-text glow-text tracking-wide">
          {title}
        </h2>
        {subtitle && <p className="text-[10px] uppercase tracking-[0.3em] opacity-60 text-white mt-2">{subtitle}</p>}
      </div>
    </div>
  );
}
