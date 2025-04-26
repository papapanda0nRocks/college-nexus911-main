
import React from "react";

interface IconProps {
  className?: string;
  size?: number;
}

export const HandshakeIcon: React.FC<IconProps> = ({ className = "", size = 24 }) => {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width={size} 
      height={size} 
      viewBox="0 0 1000 1000" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <path d="M 250 500 L 750 500" strokeWidth="80" strokeLinecap="round"/>
      <path d="M 300 350 C 400 250, 600 250, 700 350" strokeWidth="80" strokeLinecap="round"/>
      <path d="M 300 650 C 400 750, 600 750, 700 650" strokeWidth="80" strokeLinecap="round"/>
    </svg>
  );
};
