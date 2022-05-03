import React, { CSSProperties } from 'react';

const SortIcon = ({ style, className }: {style?: CSSProperties, className?: string}) => {
  return (
    <svg fill="none" viewBox="0 0 20 17" className={className} style={style}>
      <path
        fill="currentColor"
        d="M17 0v12h3l-4 5-4-5h3V0h2ZM9 14v2H0v-2h9Zm2-7v2H0V7h11Zm0-7v2H0V0h11Z"
      />
    </svg>
  );
};

export default SortIcon;
