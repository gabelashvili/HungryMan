import { CSSProperties } from 'react';

const PlusIcon = ({ styles }: {styles?:CSSProperties}) => {
  return (
    <svg style={styles} width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path
        d="M6 6V0H8V6H14V8H8V14H6V8H0V6H6Z"
        fill="currentColor"
      />
    </svg>
  );
};

export default PlusIcon;
