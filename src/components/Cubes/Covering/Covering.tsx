import { Dispatch, SetStateAction, useState } from 'react';
import ArrowIcon2 from '../../../Icons/ArrowIcon2';
import Button from '../../shared/Button';
import Colors from './Colors';
import Stickers from './Stickers';
import Text from './Text';

const Covering = ({
  handleStickerAdd, handleTextAdd, colorsList, setSelectedColor, selectedColor,
}: PropsTypes) => {
  const [selectedTab, setSelectedTab] = useState<number>(1);

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
          {selectedTab === 1 && (
          <Colors
            colorsList={colorsList}
            selectedColor={selectedColor}
            setSelectedColor={setSelectedColor}
          />
          )}
          {selectedTab === 2 && <Stickers handleStickerAdd={handleStickerAdd} />}
          {selectedTab === 3 && <Text handleTextAdd={handleTextAdd} />}
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

interface PropsTypes {
  handleStickerAdd: (file:File) => void,
  handleTextAdd: (val: {val:string, fill: string, fontFamily: string}) => void,
  colorsList: string[]
  setSelectedColor: Dispatch<SetStateAction<string>>
  selectedColor: string
}
