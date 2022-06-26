import { CSSProperties } from 'react';

const BurgerIcon = ({ style, className, handleClick }:
    {style?:CSSProperties, className?: string, handleClick?: () => void}) => {
  return (
    <svg
      fill="none"
      style={style}
      viewBox="0 0 24 24"
      className={className}
      onClick={handleClick}
    >
      <path d="M1 4H23V6H1V4ZM1 11H23V13H1V11ZM1 18H23V20H1V18Z" fill="currentColor" />
    </svg>
  );
};

export default BurgerIcon;
