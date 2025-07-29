import React from 'react';

interface HeartProps {
  size?: number;
  color?: string;
  className?: string;
}

const Heart: React.FC<HeartProps> = ({
  size = 48,
  color = '#FF0000',
  className = '',
}) => {
  // Calculate height based on original ratio (48:44 = 12:11)
  const height = size * (44 / 48);

  return (
    <svg
      width={size}
      height={height}
      viewBox="0 0 48 44"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M24 44L20.52 40.8349C8.16 29.6371 0 22.2278 0 13.188C0 5.77875 5.808 0 13.2 0C17.376 0 21.384 1.94223 24 4.98747C26.616 1.94223 30.624 0 34.8 0C42.192 0 48 5.77875 48 13.188C48 22.2278 39.84 29.6371 27.48 40.8349L24 44Z"
        fill={color}
      />
    </svg>
  );
};

export default Heart;
