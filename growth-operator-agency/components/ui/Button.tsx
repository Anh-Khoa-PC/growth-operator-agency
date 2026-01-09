import React from 'react';
import { ArrowUpRight } from 'lucide-react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'text';
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
  const baseStyles = "relative inline-flex items-center justify-center transition-all duration-300 group overflow-hidden font-medium";
  
  const variants = {
    primary: "bg-[#222222] text-white hover:bg-[#333333] border border-white/10 rounded px-6 py-3 text-sm",
    secondary: "bg-brand-orange text-white hover:bg-[#E65200] rounded-full px-8 py-4 shadow-[0_0_20px_rgba(255,92,0,0.4)]",
    outline: "bg-transparent border border-white/20 text-white hover:bg-white/5 rounded px-6 py-3",
    text: "text-brand-orange hover:text-[#FF8040] p-0"
  };

  // Specific override for the 'Apply Now' pill button in Nav
  if (className.includes('rounded-full')) {
     variants.primary = "bg-[#1A1A1A] text-white hover:bg-[#252525] border border-white/10 rounded-full px-6 py-2 text-sm";
  }

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      <span className="relative flex items-center gap-2">
        {children}
        {icon && (
          <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        )}
      </span>
    </button>
  );
};

export default Button;