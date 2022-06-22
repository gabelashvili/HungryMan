import clsx from 'clsx';
import {
  Dispatch, SetStateAction, useEffect, useRef, useState,
} from 'react';
import { toast } from 'react-toastify';
import { useAppDispatch, useSelector } from '../../../hooks/useSelector';
import ClearIcon from '../../../Icons/ClearIcon';
import SearchIcon from '../../../Icons/SearchIcon';
import { setSearchValue } from '../../../store/ducks/cubesDuck';
import Button from '../../shared/Button';
import './search-bar.scss';

const SearchBar = ({ showSearchBar, setShowSearchBar }: {showSearchBar:boolean,
     setShowSearchBar: Dispatch<SetStateAction<boolean>>}) => {
  const dispatch = useAppDispatch();
  const ref = useRef<HTMLDivElement>(null);
  const [value, setValue] = useState<string>('');
  const { purchasesByPhoneNumber } = useSelector((state) => state.cubesReducer);

  const handleClickOutside = (event: Event) => {
    const target = event.target as HTMLDivElement;
    if (ref.current && !ref.current.contains(target)) {
      setShowSearchBar(false);
    }
  };

  useEffect(() => {
    if (showSearchBar) {
      window.addEventListener('click', handleClickOutside);
    } else {
      return () => {
        window.removeEventListener('click', handleClickOutside);
      };
    }
    return () => {
      window.removeEventListener('click', handleClickOutside);
    };
  }, [showSearchBar]);

  return (
    <div className="search-bar" ref={ref}>
      <Button
        type="icon"
        classes="is-rounded search-button"
        handleClick={() => {
          if (showSearchBar) {
            if (purchasesByPhoneNumber && value in purchasesByPhoneNumber) {
              dispatch(setSearchValue(value));
            } else {
              toast.error('ნომერი არ მოიძებნა');
            }
          } else {
            setShowSearchBar(true);
          }
        }}
      >
        <SearchIcon />
      </Button>
      <div className={clsx('search-bar--content', showSearchBar && 'is-active')}>
        <div className="form__group">
          <input
            placeholder="ჩაწერე მობილურის ნომერი"
            className="input is-medium"
            type="text"
            id="search"
            value={value}
            onChange={({ target }) => setValue(target.value)}
          />
          <ClearIcon
            className="search-bar--clear"
            handleClick={() => {
              setShowSearchBar(false);
              setValue('');
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
