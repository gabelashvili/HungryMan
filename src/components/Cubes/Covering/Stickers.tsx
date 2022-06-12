import Button from '../../shared/Button';
import Sticker1 from '../../../assets/stickers/1.svg';
import Sticker2 from '../../../assets/stickers/2.svg';
import Sticker3 from '../../../assets/stickers/3.svg';
import Sticker4 from '../../../assets/stickers/4.svg';
import Sticker5 from '../../../assets/stickers/5.svg';
import Sticker6 from '../../../assets/stickers/6.svg';
import Sticker7 from '../../../assets/stickers/7.svg';
import Sticker8 from '../../../assets/stickers/8.svg';
import Sticker9 from '../../../assets/stickers/9.svg';
import { fetchSvgData } from '../../../helpers';

const stickers = [Sticker1, Sticker2, Sticker3, Sticker4, Sticker5, Sticker6, Sticker7, Sticker8, Sticker9];

const Stickers = ({ handleStickerAdd }: { handleStickerAdd: (file:File) => void}) => {
  const handleAdd = async (src:string) => {
    const file = await fetchSvgData(src);
    handleStickerAdd(file);
  };
  return (
    <div className="sticker-selector">
      {stickers.map((el) => (
        <Button type="icon" handleClick={() => handleAdd(el)} key={el}>
          <img src={el} alt="Product item" />
        </Button>
      ))}
    </div>
  );
};

export default Stickers;
