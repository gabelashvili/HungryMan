import clsx from 'clsx';
import { useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAppDispatch } from '../../../hooks/useSelector';
import ArrowIcon from '../../../Icons/ArrowIcon';
import ChangePasswordIcon from '../../../Icons/ChangePasswordIcon';
import HistoryIcon from '../../../Icons/HistoryIcon';
import LogoutIcon from '../../../Icons/LogoutIcon';
import PersonalInfoIcon from '../../../Icons/PersonalInfoIcon';
import { toggleModal } from '../../../store/ducks/modalsDuck';
import { logOut } from '../../../store/ducks/userDuck';
import './user-menu.scss';

const UserMenu = ({
  handleClickOutside, open, isRelative,
}: {
  handleClickOutside?: () => void, open: boolean, isRelative?: boolean,
}) => {
  const { pathname } = useLocation();
  const dispatch = useAppDispatch();
  const ref = useRef<HTMLElement>(null);

  const handleClick = (event: Event) => {
    const target = event.target as HTMLElement;
    if ((target.id !== 'show-user-menu' && target.parentElement?.id !== 'show-user-menu')
    && ref.current && !ref.current.contains(target)) {
      handleClickOutside && handleClickOutside();
    }
  };

  useEffect(() => {
    if (open && handleClickOutside) {
      window.addEventListener('click', handleClick);
    } else {
      return () => {
        window.removeEventListener('click', handleClick);
      };
    }
    return () => {
      window.removeEventListener('click', handleClick);
    };
  }, [open, handleClickOutside]);

  return (
    open ? (
      <nav className={clsx('user-menu', isRelative && 'is-relative')} ref={ref}>
        <ul className="user-menu--list">
          {navItems.map(({ title, path, Icon }) => (
            <li className="user-menu--item" key={path}>
              <Link to={path} className={clsx('user-menu--link', path === pathname && 'is-active')}>
                <div className="user-menu--icon"><Icon /></div>
                <span>{title}</span>
                {isRelative && <ArrowIcon className="arrow-icon" />}
              </Link>
            </li>
          ))}
          <li className="user-menu--item">
            <a className="user-menu--link " onClick={() => dispatch(toggleModal('myAddressList'))}>
              <div className="user-menu--icon">
                <PersonalInfoIcon />
              </div>
              ჩემი მისამართები
            </a>
          </li>
          <li className="user-menu--item">
            <a className="user-menu--link log-out" onClick={() => dispatch(logOut())}>
              <div className="user-menu--icon">
                <LogoutIcon />
              </div>
              გასვლა
            </a>
          </li>
        </ul>
      </nav>
    ) : null

  );
};

export default UserMenu;

const navItems = [
  {
    title: 'პერსონალური ინფორმაცია',
    path: '/user-dashboard',
    Icon: PersonalInfoIcon,
  },
  {
    title: 'პაროლის შეცვლა',
    path: '/user-dashboard/change-password',
    Icon: ChangePasswordIcon,
  },
  {
    title: 'შეკვეთების ისტორია',
    path: '/user-dashboard/order-history',
    Icon: HistoryIcon,
  },
];
