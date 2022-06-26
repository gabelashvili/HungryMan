import clsx from 'clsx';
import {
  Dispatch, KeyboardEvent, SetStateAction, useEffect, useRef, useState,
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
  const [isFocused, setFocused] = useState<boolean>(false);
  const ref = useRef<HTMLDivElement>(null);
  const [value, setValue] = useState<string>('');
  const { purchasesByPhoneNumber } = useSelector((state) => state.cubesReducer);

  const handleClickOutside = (event: Event) => {
    const target = event.target as HTMLDivElement;
    if (ref.current && !ref.current.contains(target)) {
      setShowSearchBar(false);
    }
  };

  const handleSearch = () => {
    if (showSearchBar && value.length > 0) {
      if (purchasesByPhoneNumber && value in purchasesByPhoneNumber) {
        dispatch(setSearchValue(value));
      } else {
        toast.error('ნომერი არ მოიძებნა');
      }
    } else {
      setShowSearchBar(true);
    }
  };

  const handleKeyDown = (e:KeyboardEvent) => {
    if (e.key === 'Enter') {
      if (isFocused) {
        handleSearch();
      }
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
    <div ref={ref} className={clsx('search-bar', showSearchBar && 'is-active')}>
      <Button
        type="icon"
        classes="is-rounded search-button"
        handleClick={handleSearch}
      >
        <SearchIcon />
      </Button>
      <div className={clsx('search-bar--content', showSearchBar && 'is-active')}>
        <div className="form__group">
          <input
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            onKeyDown={handleKeyDown}
            placeholder="ჩაწერე მობილურის ნომერი"
            className="input is-medium"
            type="text"
            id="search"
            value={value}
            onChange={({ target }) => setValue(target.value)}
          />
          <Button
            classes="is-rounded search-button--right"
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
            <svg viewBox="0 0 24 24" fill="none">
              <path d="M16.172 11H4V13H16.172L10.808 18.364L12.222 19.778L20 12L12.222 4.22205L10.808 5.63605L16.172 11Z" fill="currentColor" />
            </svg>
          </Button>
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
