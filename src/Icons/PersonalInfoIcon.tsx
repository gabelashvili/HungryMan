import { CSSProperties } from 'react';

const PersonalInfoIcon = ({ className, style }: {className?: string, style?: CSSProperties}) => {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      className={className}
      style={style}
    >
      <path
        d="M10.1009 10.65C10.0426 10.6417 9.96758 10.6417 9.90091 10.65C8.43424 10.6 7.26758 9.40001 7.26758 7.92501C7.26758 6.41668 8.48424 5.19168 10.0009 5.19168C11.5092 5.19168 12.7342 6.41668 12.7342 7.92501C12.7259 9.40001 11.5676 10.6 10.1009 10.65Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M15.6161 16.15C14.1328 17.5083 12.1661 18.3333 9.99948 18.3333C7.83281 18.3333 5.86615 17.5083 4.38281 16.15C4.46615 15.3667 4.96615 14.6 5.85781 14C8.14115 12.4833 11.8745 12.4833 14.1411 14C15.0328 14.6 15.5328 15.3667 15.6161 16.15Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9.99935 18.3333C14.6017 18.3333 18.3327 14.6024 18.3327 9.99999C18.3327 5.39762 14.6017 1.66666 9.99935 1.66666C5.39698 1.66666 1.66602 5.39762 1.66602 9.99999C1.66602 14.6024 5.39698 18.3333 9.99935 18.3333Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default PersonalInfoIcon;
