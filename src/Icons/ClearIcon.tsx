import React, { CSSProperties } from 'react';

const ClearIcon = ({ style, className, handleClick }:
    {style?:CSSProperties, className?: string, handleClick?: () => void}) => {
  return (
    <svg
      fill="none"
      viewBox="0 0 14 14"
      width="12px"
      height="12px"
      className={className}
      style={style}
      onClick={handleClick}
    >
      <path
        fill="currentColor"
        d="m7 5.586 4.95-4.95 1.414 1.414L8.414 7l4.95 4.95-1.414 1.414L7 8.414l-4.95 4.95L.636 11.95 5.586 7 .636 2.05 2.05.636 7 5.586Z"
      />
    </svg>
  );
};

export default ClearIcon;
