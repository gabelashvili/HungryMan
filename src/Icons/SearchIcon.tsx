import React, { CSSProperties } from 'react';

const SearchIcon = ({ style, className }: {style?: CSSProperties, className?: string}) => {
  return (
    <svg fill="none" viewBox="0 0 21 21">
      <path
        fill="currentColor"
        style={style}
        className={className}
        d="m16.031 14.617 4.283 4.282-1.415 1.415-4.282-4.283A8.96 8.96 0 0 1 9 18c-4.968 0-9-4.032-9-9s4.032-9 9-9 9 4.032 9 9a8.96 8.96 0 0 1-1.969 5.617Zm-2.006-.742A6.977 6.977 0 0 0 16 9c0-3.868-3.133-7-7-7-3.868 0-7 3.132-7 7 0 3.867 3.132 7 7 7a6.977 6.977 0 0 0 4.875-1.975l.15-.15Z"
      />
    </svg>
  );
};

export default SearchIcon;
