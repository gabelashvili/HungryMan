import { CSSProperties } from 'react';

const ChangePasswordIcon = ({ className, style }: {className?: string, style?: CSSProperties}) => {
  return (
    <svg
      fill="none"
      style={style}
      viewBox="0 0 20 20"
      className={className}
    >
      <path
        d="M16.4912 3.51666C14.0246 1.05833 10.0246 1.05833 7.57455 3.51666C5.84955 5.225 5.33289 7.68333 5.99955 9.85L2.08289 13.7667C1.80789 14.05 1.61622 14.6083 1.67455 15.0083L1.92455 16.825C2.01622 17.425 2.57455 17.9917 3.17455 18.075L4.99122 18.325C5.39122 18.3833 5.94955 18.2 6.23289 17.9083L6.91622 17.225C7.08289 17.0667 7.08289 16.8 6.91622 16.6333L5.29955 15.0167C5.05789 14.775 5.05789 14.375 5.29955 14.1333C5.54122 13.8917 5.94122 13.8917 6.18289 14.1333L7.80789 15.7583C7.96622 15.9167 8.23288 15.9167 8.39122 15.7583L10.1579 14C12.3162 14.675 14.7746 14.15 16.4912 12.4417C18.9496 9.98333 18.9496 5.975 16.4912 3.51666ZM12.0829 10C10.9329 10 9.99955 9.06666 9.99955 7.91666C9.99955 6.76666 10.9329 5.83333 12.0829 5.83333C13.2329 5.83333 14.1662 6.76666 14.1662 7.91666C14.1662 9.06666 13.2329 10 12.0829 10Z"
        fill="currentColor"
      />
    </svg>
  );
};

export default ChangePasswordIcon;
