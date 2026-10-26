import React from 'react';
import logoPng from '../assets/images/logo_rofaarabic.png';

interface RofaLogoProps {
  className?: string;
  size?: number | string;
  useImageTag?: boolean;
}

export const RofaLogo: React.FC<RofaLogoProps> = ({
  className = 'w-8 h-8',
  useImageTag = true,
}) => {
  if (useImageTag) {
    return (
      <img
        src={logoPng}
        alt="RofaArabic Logo"
        className={`object-contain rounded-lg ${className}`}
      />
    );
  }

  return (
    <svg
      viewBox="0 0 1000 1000"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Background Dark Teal matching official uploaded logo */}
      <rect width="1000" height="1000" fill="#184E52" rx="60" />

      {/* 1. Top-Right Outer Roof and Right Wall */}
      <polygon
        points="
          500,126
          833,459
          833,874
          751,874
          751,493
          500,242
          393,349
          335,291
        "
        fill="#EC853E"
      />

      {/* 2. White Nuqthah (Tilted Square 82x82 aligned with 45-deg roof) */}
      <polygon
        points="
          246,322
          304,264
          362,322
          304,380
        "
        fill="#FFFFFF"
      />

      {/* 3. Left Wall, Bottom Bar, Right Stem, Inner Roof & Letter Fa Loop */}
      <path
        d="
          M 167,459
          L 217,409
          L 275,467
          L 249,493
          L 249,792
          L 583,792
          L 583,704
          L 326,704
          L 326,540
          L 495,371
          L 665,540
          L 665,874
          L 167,874
          Z
          M 495,487
          L 583,574
          L 583,622
          L 408,622
          L 408,574
          Z
        "
        fill="#EC853E"
        fillRule="evenodd"
      />
    </svg>
  );
};

export default RofaLogo;
