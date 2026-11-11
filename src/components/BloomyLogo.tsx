import React from 'react';

interface BloomyLogoProps {
  variant?: 'light' | 'dark';
  className?: string;
  iconStyle?: React.CSSProperties;
  textStyle?: React.CSSProperties;
}

export const BloomyLogo: React.FC<BloomyLogoProps> = ({
  variant = 'light',
  className = '',
  iconStyle,
  textStyle,
}) => {
  const isDarkBg = variant === 'dark';
  const imgSrc = isDarkBg
    ? '/assets/aistudio/For_Black_Bg_9ffab510.png'
    : '/assets/aistudio/For_White_Bg_9cdff15c.png';

  return (
    <span
      className={`inline-flex items-center select-none whitespace-nowrap shrink-0 ${className}`}
    >
      <img
        src={imgSrc}
        alt="Bloomy leaf mark"
        className="object-contain shrink-0"
        style={{
          width: '2.1em',
          height: '2.1em',
          marginRight: '0.28em',
          filter: isDarkBg
            ? undefined
            : 'brightness(0) saturate(100%) invert(17%) sepia(69%) saturate(1589%) hue-rotate(128deg) brightness(91%) contrast(97%)',
          ...iconStyle,
        }}
      />
      <span
        className="font-brand font-bold lowercase leading-none"
        style={{
          color: isDarkBg ? '#F5F8EF' : '#08482D',
          letterSpacing: '-0.03em',
          ...textStyle,
        }}
      >
        bloomy
      </span>
    </span>
  );
};
