import { RefObject, useEffect } from 'react';

const useOutsideClick = ({ ref, disabled, handleOutsideClick }: PropsTypes) => {
  console.log(ref, disabled, handleOutsideClick);
  const handleClickOutside = (event: Event) => {
    if (ref.current && !ref.current.contains(event.target as HTMLDivElement)) {
      handleOutsideClick();
    }
  };

  useEffect(() => {
    !disabled && document.addEventListener('mousedown', handleClickOutside);
    return () => {
      !disabled && document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref, disabled]);
};

export default useOutsideClick;

interface PropsTypes {
    ref: RefObject<HTMLDivElement>,
    handleOutsideClick: () => void,
    disabled?: boolean
}
