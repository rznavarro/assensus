import React from 'react';

interface VertexGlyphProps {
  className?: string;
  size?: number;
  strokeWidth?: number;
  color?: string; // CSS color string or currentColor
  variant?: 'normal' | 'animated';
}

export const VertexGlyph: React.FC<VertexGlyphProps> = ({
  className = '',
  size = 24,
  strokeWidth = 2,
  color = 'currentColor',
  variant = 'normal',
}) => {
  return (
    <svg
      width={size}
      height={(size * 86) / 100}
      viewBox="0 0 100 86"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M 6 82 L 50 6 L 94 82 Z"
        stroke={color}
        strokeWidth={strokeWidth * (100 / size)}
        strokeLinecap="round"
        strokeLinejoin="round"
        className={variant === 'animated' ? 'anim-draw-outer' : ''}
      />
      <path
        d="M 28 82 L 50 40 L 72 82 Z"
        stroke={color}
        strokeWidth={strokeWidth * (100 / size)}
        strokeLinecap="round"
        strokeLinejoin="round"
        className={variant === 'animated' ? 'anim-draw-inner' : ''}
      />
    </svg>
  );
};
