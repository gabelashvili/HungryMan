import React, { useEffect, useState } from 'react';
import ArrowIcon2 from '../../../Icons/ArrowIcon2';
import Button from '../../shared/Button';
import Colors from './Colors';

const Covering = () => {
  const [selectedTab, setSelectedTab] = useState<number>(1);
  const [selectedColor, setSelectedColor] = useState<string>(colorsList[0]);
  const handleTabChange = (type: 'prev' | 'next') => {
    if (type === 'next' && selectedTab < 3) {
      setSelectedTab(selectedTab + 1);
    } else if (type === 'next' && selectedTab === 3) {
      setSelectedTab(1);
    } else if (type === 'prev' && selectedTab === 1) {
      setSelectedTab(3);
    } else {
      setSelectedTab(selectedTab - 1);
    }
  };

  const handleCubeClick = (e: MouseEvent) => {
    const target = e.target as HTMLElement;
    if (target.tagName === 'rect' && target.getAttribute('id') && target.getAttribute('data-selectable') === 'true') {
      console.log(target);
      target.style.fill = selectedColor;
    }
  };

  useEffect(() => {
    window.addEventListener('mousedown', handleCubeClick);
    return () => window.removeEventListener('mousedown', handleCubeClick);
  }, [selectedColor]);
  return (
    <div className="cart-slider">
      <div className="cart-slider--header">
        <Button type="icon" classes=" is-xs is-rounded" handleClick={() => handleTabChange('prev')}>
          <ArrowIcon2 />
        </Button>
        <h6 className="cart-slider--title">{tabs.find((x) => x.value === selectedTab)?.label}</h6>
        <div className="cart-slider--counter">
          0
          {selectedTab}
          /
          0
          {tabs.length}
        </div>
        <Button type="icon" classes=" is-xs is-rounded" handleClick={() => handleTabChange('next')}>
          <ArrowIcon2 style={{ transform: 'rotate(180deg)' }} />
        </Button>
      </div>
      <div className="cart-slider--list">
        <div className="cart-slider--item">
          <Colors colorsList={colorsList} selectedColor={selectedColor} setSelectedColor={setSelectedColor} />
        </div>
      </div>
    </div>
  );
};

export default Covering;

const tabs = [
  {
    label: 'ფერები',
    value: 1,
  },
  {
    label: 'სტიკერები',
    value: 2,
  },
  {
    label: 'ტექსტი',
    value: 3,
  },
];

const colorsList = ['#FF8385', '#0193E5', '#F78F1E', '#34A853', '#FFFFFF', '#1877F2', '#F7DCBF', '#D8A782', '#EA4335', '#1A3044'];
