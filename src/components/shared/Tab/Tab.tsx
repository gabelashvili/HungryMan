import clsx from 'clsx';
import { Dispatch, SetStateAction } from 'react';
import './tab.scss';

const Tab = ({
  selectedTab, setSelectedTab, className, inline, tabs,
}: PropsType) => {
  return (
    <nav className={clsx('tab', className, inline && 'inline')}>
      <ul className="tab--list">
        {tabs.map((el) => (
          <li className={clsx('tab--item', selectedTab === el.value && 'is-active')} key={el.value}>
            <div className="tab--link" onClick={() => setSelectedTab(el.value)}>
              {el.label}
              {el.counter && (
              <span className="tab--counter">
                {el.counter}
              </span>
              )}
            </div>
          </li>
        ))}
      </ul>
    </nav>

  );
};

export default Tab;

interface PropsType {
  selectedTab: number,
  setSelectedTab: Dispatch<SetStateAction<number>>,
  className?: string,
  inline?: boolean,
  tabs: {
    label: string,
    value: number,
    counter?: number
  }[]
}
