const ReloadIcon = ({ handleClick }: {handleClick?: () => void}) => {
  return (
    <svg fill="none" viewBox="0 0 18 18" width="16px" onClick={handleClick}>
      <path
        fill="currentColor"
        d="M3.479 2.758A8.302 8.302 0 0 1 9 .667a8.333 8.333 0 0 1 6.84 13.095L13.585 9h2.083A6.667 6.667 0 0 0 4.23 4.344L3.48 2.76h-.001Zm11.045 12.484A8.302 8.302 0 0 1 9 17.333 8.333 8.333 0 0 1 2.162 4.238L4.418 9H2.335a6.667 6.667 0 0 0 11.438 4.656l.75 1.585Z"
      />
    </svg>
  );
};

export default ReloadIcon;
