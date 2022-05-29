import React, { CSSProperties } from 'react';

const ArrowIcon2 = ({ className, style }: {className?: string, style?: CSSProperties}) => {
  return (
    <svg
      fill="none"
      viewBox="0 0 16 16"
      style={style}
      className={className}
    >
      <path
        fill="currentColor"
        d="M3.828 7H16v2H3.828l5.364 5.364-1.414 1.414L0 8 7.778.222l1.414 1.414L3.828 7Z"
      />
    </svg>
  );
};

export default ArrowIcon2;
