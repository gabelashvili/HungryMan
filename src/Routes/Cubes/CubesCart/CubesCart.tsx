import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Covering from '../../../components/Cubes/Covering/Covering';
import CubesCartRightSide from '../../../components/Cubes/CubesCartRightSide';
import CubesGift from '../../../components/Cubes/CubesGift';
import DrawGridWithCubesId from '../../../components/Cubes/DrawGrid/DrawGridWithCubesId';
import UploadImgBtn from '../../../components/Cubes/UploadImgBtn';
import Zoom from '../../../components/Cubes/Zoom/Zoom';
import Button from '../../../components/shared/Button';
import Tab from '../../../components/shared/Tab/Tab';
import { useSelector } from '../../../hooks/useSelector';
import RemoveIcon from '../../../Icons/RemoveIcon';

export const ZOOM_STEP = 0.05;
const CubesCart = () => {
  const navigate = useNavigate();
  const [scale, setScale] = useState<number>(1);
  const totalPrice = useSelector((state) => state.cubesReducer.selectedCubesInfo?.totalPrice) || 0;
  const selectedCubesId = useSelector((state) => state.cubesReducer.selectedCubesInfo?.cubesId);
  const [text, setText] = useState<{val:string}>({ val: '' });
  const [selectedColor, setSelectedColor] = useState<string>(colorsList[0]);
  const [selectedObjectId, setSelectedObjectId] = useState<string | null>(null);
  const [selectedTab, setSelectedTab] = useState<number>(0);
  const [giftOneProp, setGiftOneProp] = useState<{id:number, value:string} | null>(null);
  const [giftTwoProp, setGiftTwoProp] = useState<{id:number, value:string} | null>(null);
  const [images, setImages] = useState<{id:string, file:File}[]>([]);
  const showGiftTabError = () => {
    if (totalPrice > 50 && totalPrice < 100 && !giftOneProp) {
      return true;
    }
    if (totalPrice > 100 && (!giftOneProp || !giftTwoProp)) {
      return true;
    }
    return false;
  };

  const tabs = [
    {
      label: 'ატვირთე სურათი',
      value: 0,
    },
    {
      label: 'გაფორმება',
      value: 1,
    },
    {
      label: 'საჩუქარი',
      value: 2,
      showError: showGiftTabError(),
    },
  ];

  const handleImg = (file:File) => {
    const newImgs = images.filter((el) => el.id !== 'image-1');
    newImgs.push({ file, id: 'image-1' });
    setImages(newImgs);
  };

  const handleStickerAdd = (file: File) => {
    const newImgs = [...images];
    const id = newImgs.length === 0 ? 1 : Number(images.slice(-1)[0].id.split('-')[1]) + 1;
    newImgs.push({ file, id: `sticker-${id}` });
    setImages(newImgs);
  };

  const handleRemove = () => {
    const newImgs = images.filter((el) => el.id !== selectedObjectId);
    setImages(newImgs);
  };

  const handleTextAdd = (text:{val:string}) => {
    setText(text);
  };

  useEffect(() => {
    if ((selectedCubesId && selectedCubesId.length === 0) || !selectedCubesId) {
      navigate('/cubes');
    }
  }, [selectedCubesId]);

  return (
    <div className="cart">
      <div className="wrapper">
        <div className="panel cart">
          <div className="panel--header with-border">
            <Tab
              selectedTab={selectedTab}
              tabs={totalPrice < 50 ? tabs.slice(0, 2) : tabs}
              setSelectedTab={setSelectedTab}
            />
          </div>
          <div className="panel--content cart-content">
            {selectedTab < 2 && (
            <div className="cart-content--header">
              {images.length > 0 && (
              <Button type="primary" classes="button--icon is-medium" handleClick={handleRemove}>
                <RemoveIcon />
              </Button>
              )}
              <Zoom
                scale={scale}
                setScale={setScale}
              />
            </div>
            )}
            {selectedTab === 2 && (
              <CubesGift
                totalPrice={totalPrice}
                setGiftOneProp={setGiftOneProp}
                setGiftTwoProp={setGiftTwoProp}
                giftOneProp={giftOneProp}
                giftTwoProp={giftTwoProp}
              />
            ) }
            <div style={{
              alignItems: 'center',
              justifyContent: 'center',
              height: '100%',
              minHeight: 'inherit',
              overflow: 'hidden',
              display: selectedTab === 2 ? 'none' : 'flex',
            }}
            >
              <DrawGridWithCubesId
                selectedObjectId={selectedObjectId}
                setSelectedObjectId={setSelectedObjectId}
                scale={scale}
                setScale={setScale}
                text={text}
                images={images}
                selectedColor={selectedColor}
              />
            </div>
          </div>
          {selectedTab < 2 && (
          <div className="panel--footer">
            {selectedTab === 0 ? (
              <UploadImgBtn
                uploadedFile={images.find((el) => el.id === 'image-1')?.file}
                setUploadedFile={handleImg}
              />
            )
              : (
                <Covering
                  handleStickerAdd={handleStickerAdd}
                  handleTextAdd={handleTextAdd}
                  selectedColor={selectedColor}
                  setSelectedColor={setSelectedColor}
                  colorsList={colorsList}
                />
              )}
          </div>
          )}
        </div>
        <div className="panel without-header cart-form">
          <CubesCartRightSide
            selectedCubes={selectedCubesId || []}
            giftOneProp={giftOneProp}
            giftTwoProp={giftTwoProp}
          />
        </div>
      </div>
    </div>
  );
};

export default CubesCart;

const colorsList = ['#FF8385', '#0193E5', '#F78F1E', '#34A853', '#FFFFFF', '#1877F2', '#F7DCBF', '#D8A782', '#EA4335', '#1A3044'];
