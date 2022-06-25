import { CSSProperties } from 'react';

const HistoryIcon = ({ className, style }: {className?: string, style?: CSSProperties}) => {
  return (
    <svg
      fill="none"
      style={style}
      viewBox="0 0 20 20"
      className={className}
    >
      <path
        d="M18.3327 8.33332V12.5C18.3327 16.6667 16.666 18.3333 12.4993 18.3333H7.49935C3.33268 18.3333 1.66602 16.6667 1.66602 12.5V7.49999C1.66602 3.33332 3.33268 1.66666 7.49935 1.66666H11.666"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M18.3327 8.33332H14.9993C12.4993 8.33332 11.666 7.49999 11.666 4.99999V1.66666L18.3327 8.33332Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M5.83398 10.8333H10.834"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M5.83398 14.1667H9.16732"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default HistoryIcon;
