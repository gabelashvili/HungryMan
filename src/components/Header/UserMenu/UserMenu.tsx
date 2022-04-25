import { useEffect, useRef } from 'react';
import ChangePasswordIcon from '../../../Icons/ChangePasswordIcon';
import HistoryIcon from '../../../Icons/HistoryIcon';
import LogoutIcon from '../../../Icons/LogoutIcon';
import PersonalInfoIcon from '../../../Icons/PersonalInfoIcon';
import './user-menu.scss';

const UserMenu = ({ handleClickOutside, open }: {handleClickOutside: () => void, open: boolean}) => {
  const ref = useRef<HTMLElement>(null);

  const handleClick = (event: Event) => {
    const target = event.target as HTMLElement;
    if ((target.id !== 'show-user-menu' && target.parentElement?.id !== 'show-user-menu')
    && ref.current && !ref.current.contains(target)) {
      handleClickOutside();
    }
  };

  useEffect(() => {
    if (open) {
      window.addEventListener('click', handleClick);
    } else {
      return () => {
        window.removeEventListener('click', handleClick);
      };
    }
    return () => {
      window.removeEventListener('click', handleClick);
    };
  }, [open]);

  return (
    <nav className={`user-menu${open ? '' : '--hide'}`} ref={ref}>
      <ul className="user-menu--list">
        <li className="user-menu--item">
          <a className="user-menu--link">
            <PersonalInfoIcon className="user-menu--icon" />
            პერსონალური ინფორმაცია
          </a>
        </li>
        <li className="user-menu--item">
          <a className="user-menu--link">
            <ChangePasswordIcon className="user-menu--icon" />
            პაროლის შეცვლა
          </a>
        </li>
        <li className="user-menu--item">
          <a className="user-menu--link">
            <HistoryIcon className="user-menu--icon" />
            შეკვეთების ისტორია
          </a>
        </li>
        <li className="user-menu--item">
          <a className="user-menu--link log-out">
            <LogoutIcon className="user-menu--icon" />
            გასვლა
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default UserMenu;
