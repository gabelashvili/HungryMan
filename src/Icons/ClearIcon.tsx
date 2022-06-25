import React, { CSSProperties } from 'react';

const ClearIcon = ({ style, className, handleClick }:
    {style?:CSSProperties, className?: string, handleClick?: () => void}) => {
  return (
    <svg
      fill="none"
      style={style}
      viewBox="0 0 24 24"
      className={className}
      onClick={handleClick}
    >
      <path d="M11.9997 10.586L16.9497 5.63599L18.3637 7.04999L13.4137 12L18.3637 16.95L16.9497 18.364L11.9997 13.414L7.04974 18.364L5.63574 16.95L10.5857 12L5.63574 7.04999L7.04974 5.63599L11.9997 10.586Z" fill="currentColor" />
    </svg>
  );
};

export default ClearIcon;
