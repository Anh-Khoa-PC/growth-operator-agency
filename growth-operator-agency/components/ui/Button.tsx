import React from 'react';
import { ArrowUpRight } from 'lucide-react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'text' | 'beam';
  children: React.ReactNode;
  icon?: boolean;
}

const Button: React.FC<ButtonProps> = ({ 
  variant = 'primary', 
  children, 
  icon = true,
  className = '',
  ...props 
}) => {
  const baseStyles = "relative inline-flex items-center justify-center transition-all duration-300 group font-medium cursor-pointer";
  
  const variants = {
    primary: "bg-[#222222] text-white hover:bg-[#333333] border border-white/10 rounded px-5 py-2.5 text-xs",
    secondary: "bg-brand-orange text-white hover:bg-[#E65200] rounded-full px-6 py-3 shadow-[0_0_20px_rgba(255,107,0,0.4)] text-xs",
    outline: "bg-transparent border border-white/20 text-white hover:bg-white/5 rounded px-5 py-2.5 text-xs",
    text: "text-brand-orange hover:text-[#FF8040] p-0 text-sm",
    beam: "rounded-xl p-[1px] md:p-[0.5px] overflow-hidden" 
  };

  if (variant === 'beam') {
    return (
      <button className={`${baseStyles} ${variants.beam} ${className}`} {...props}>
        {/* Spinning Gradient - Shortened Beam Trail */}
        <span className="absolute inset-[-1000%] animate-[spin_4s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,transparent_0%,#ff6b00_10%,transparent_20%)]" />
        
        {/* Inner Button Content - Increased Size */}
        <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-xl bg-[#0a0a0a] px-9 py-4 text-base font-bold text-white backdrop-blur-3xl transition-all group-hover:bg-[#151515]">
          <span className="relative flex items-center gap-2">
            {children}
            {icon && (
              <ArrowUpRight className="w-5 h-5 text-gray-400 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-brand-orange" />
            )}
          </span>
        </span>
      </button>
    );
  }

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      <span className="relative flex items-center gap-2">
        {children}
        {icon && (
          <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        )}
      </span>
    </button>
  );
};

export default Button;