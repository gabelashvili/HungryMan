import React, { CSSProperties } from 'react';

const ArrowIcon = ({ className, styles }: {className?: string, styles?: CSSProperties}) => {
  return (
    <svg
      fill="none"
      viewBox="0 0 6 10"
      width="7px"
      className={className}
      style={styles}
    >
      <path
        fill="currentColor"
        d="M3.173 5 .343 2.172 1.759.757 6 5 1.758 9.243.344 7.828 3.173 5Z"
      />
    </svg>
  );
};

export default ArrowIcon;
