import clsx from 'clsx';
import { Dispatch, SetStateAction } from 'react';
import './user-dashboard-tab.scss';

const UserDashboardTab = ({ selectedTab, setSelectedTab }: PropsType) => {
  return (
    <nav className="tab inline">
      <ul className="tab--list">
        <li
          className={clsx('tab--item', selectedTab === 0 && 'is-active')}
        >
          <div className="tab--link" onClick={() => setSelectedTab(0)}>
            პროდუქცია
            {false && <span className="tab--counter"> 0 </span>}
          </div>
        </li>
        <li className={clsx('tab--item', selectedTab === 1 && 'is-active')}>
          <div className="tab--link" onClick={() => setSelectedTab(1)}>
            უჯრები
            <span className="tab--counter"> 123 </span>
          </div>
        </li>
      </ul>
    </nav>

  );
};

export default UserDashboardTab;

interface PropsType {
  selectedTab: 0 | 1,
  setSelectedTab: Dispatch<SetStateAction<0 | 1>>
}
