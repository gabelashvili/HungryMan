import clsx from 'clsx';
import {
  Dispatch, SetStateAction, useEffect, useRef, useState,
} from 'react';
import ClearIcon from '../../../Icons/ClearIcon';
import SearchIcon from '../../../Icons/SearchIcon';
import './search-bar.scss';

const SearchBar = ({ showSearchBar, setShowSearchBar }: {showSearchBar:boolean,
     setShowSearchBar: Dispatch<SetStateAction<boolean>>}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [searchValue, setSearchValue] = useState<string>('');

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
      <button className="button button--icon-rounded" onClick={() => setShowSearchBar(true)}>
        <SearchIcon />
      </button>
      <div className={clsx('search-bar--content', showSearchBar && 'is-active')}>
        <div className="form__group">
          <input
            placeholder="ჩაწერე მობილურის ნომერი"
            className="input input--small"
            type="text"
            id="search"
            value={searchValue}
            onChange={({ target }) => setSearchValue(target.value)}
          />
          <ClearIcon
            className="search-bar--clear"
            handleClick={() => {
              setShowSearchBar(false);
              setSearchValue('');
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
