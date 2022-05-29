import { useState } from 'react';
import DrawGridWithCubesId from '../../../components/Cubes/DrawGridWithCubesId';
import UploadImgBtn from '../../../components/Cubes/UploadImgBtn';
import Zoom from '../../../components/Cubes/Zoom/Zoom';
import Button from '../../../components/shared/Button';
import Tab from '../../../components/shared/Tab/Tab';
import RemoveIcon from '../../../Icons/RemoveIcon';

export const ZOOM_STEP = 0.05;
const CubesCart = () => {
  const [zoom, setZoom] = useState<number>(100);
  const [selectedTab, setSelectedTab] = useState<number>(0);
  const [uploadedImage, setUploadedImage] = useState<File | null>(null);
  const [zoomActions, setZoomActions] = useState<{
    in:() => void,
    out: () => void
      } | null>(null);
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

  return (
    <div className="cart">
      <div className="wrapper">
        <div className="panel cart">
          <div className="panel--header with-border">
            <Tab selectedTab={selectedTab} tabs={tabs} setSelectedTab={setSelectedTab} />
          </div>
          <div className="panel--content cart-content">
            <div className="cart-content--header">
              {uploadedImage && (
              <Button type="primary" classes="button--icon is-medium" handleClick={() => setUploadedImage(null)}>
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
                image={uploadedImage}
              />
            </div>
          </div>
          <div className="panel--footer">
            <UploadImgBtn uploadedFile={uploadedImage} setUploadedFile={setUploadedImage} />
          </div>
        </div>
        <div className="panel without-header cart-form">
          <div className="panel--content">
            right side
          </div>
        </div>
      </div>
    </div>
  );
};

export default CubesCart;
