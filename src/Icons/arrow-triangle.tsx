import { CSSProperties } from 'react';

const TriangleArrowIcon = ({ style, className, handleClick }:
    {style?:CSSProperties, className?: string, handleClick?: () => void}) => {
  return (
    <svg
      fill="none"
      style={style}
      width="24px"
      height="24px"
      viewBox="0 0 24 24"
      className={className}
      onClick={handleClick}
    >
      <path fill="currentColor" d="m12 16-6-6h12l-6 6Z" />
    </svg>
  );
};

export default TriangleArrowIcon;
