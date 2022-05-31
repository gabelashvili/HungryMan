import { useState } from 'react';
import Covering from '../../../components/Cubes/Covering/Covering';
import CubesCartRightSide from '../../../components/Cubes/CubesCartRightSide';
import DrawGridWithCubesId from '../../../components/Cubes/DrawGridWithCubesId';
import UploadImgBtn from '../../../components/Cubes/UploadImgBtn';
import Zoom from '../../../components/Cubes/Zoom/Zoom';
import Button from '../../../components/shared/Button';
import Tab from '../../../components/shared/Tab/Tab';
import RemoveIcon from '../../../Icons/RemoveIcon';

export const ZOOM_STEP = 0.05;
const CubesCart = () => {
  const [text, setText] = useState<{val:string, fontSize: number}>({ val: '', fontSize: 10 });
  const [selectedObjectId, setSelectedObjectId] = useState<string>('');
  const [zoom, setZoom] = useState<number>(100);
  const [selectedTab, setSelectedTab] = useState<number>(0);
  const [images, setImages] = useState<{id:string, file?:File, base64?: string, value?: string}[]>([]);
  const [zoomActions, setZoomActions] = useState<{
    in:() => void,
    out: () => void
      } | null>(null);

  const handleImg = (file:File, base64:string) => {
    const newImgs = images.filter((el) => el.id !== 'image-1');
    newImgs.push({ file, base64, id: 'image-1' });
    setImages(newImgs);
  };

  const handleStickerAdd = (base64:string) => {
    const newImgs = [...images];
    const id = newImgs.length === 0 ? 1 : Number(images.slice(-1)[0].id.split('-')[1]) + 1;
    newImgs.push({ base64, id: `sticker-${id}` });
    setImages(newImgs);
  };

  const handleRemove = () => {
    const newImgs = images.filter((el) => el.id !== selectedObjectId);
    setImages(newImgs);
  };

  const handleSelectObj = (val:string) => {
    const el = images.find((el) => el.id === val);
    if (el) {
      let newArr = images.filter((el) => el.id !== val);
      newArr = [...newArr, el];
      setImages(newArr);
      setSelectedObjectId(val);
    }
  };

  const handleTextAdd = (text:{val:string, fontSize: number}) => {
    setText(text);
  };
  console.log(text);

  return (
    <div className="cart">
      <div className="wrapper">
        <div className="panel cart">
          <div className="panel--header with-border">
            <Tab selectedTab={selectedTab} tabs={tabs} setSelectedTab={setSelectedTab} />
          </div>
          <div className="panel--content cart-content">
            <div className="cart-content--header">
              {images.length > 0 && (
              <Button type="primary" classes="button--icon is-medium" handleClick={handleRemove}>
                <RemoveIcon />
              </Button>
              )}
              <Zoom
                styles={{ position: 'static', marginLeft: 'auto' }}
                zoomPercent={zoom}
                zoomIn={zoomActions?.in}
                zoomOut={zoomActions?.out}
              />
            </div>
            <div style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', minHeight: 'inherit', overflow: 'hidden',
            }}
            >
              <DrawGridWithCubesId
                setZoom={setZoom}
                setZoomActions={setZoomActions}
                images={images}
                selectedObjectId={selectedObjectId}
                setSelectedObjectId={(val) => handleSelectObj(val)}
                text={text}
              />
            </div>
          </div>
          <div className="panel--footer">
            {selectedTab === 0 ? (
              <UploadImgBtn
                uploadedFile={images.find((el) => el.id === 'image-1')?.file}
                setUploadedFile={handleImg}
              />
            )
              : <Covering handleStickerAdd={handleStickerAdd} handleTextAdd={handleTextAdd} />}
          </div>
        </div>
        <div className="panel without-header cart-form">
          <CubesCartRightSide />
        </div>
      </div>
    </div>
  );
};

export default CubesCart;

const tabs = [
  {
    label: 'ატვირთე სურათი',
    value: 0,
  },
  {
    label: 'გაფორმება',
    value: 1,
  },
];
