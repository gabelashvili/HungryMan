import { useState } from 'react';
import DrawGridWithCubesId from '../../../components/Cubes/DrawGridWithCubesId';
import UploadImgBtn from '../../../components/Cubes/UploadImgBtn';
import Zoom from '../../../components/Cubes/Zoom/Zoom';
import Button from '../../../components/shared/Button';
import Tab from '../../../components/shared/Tab/Tab';
import RemoveIcon from '../../../Icons/RemoveIcon';

const CubesCart = () => {
  const [zoom, setZoom] = useState<number>(100);
  const [selectedTab, setSelectedTab] = useState<number>(0);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
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

  const handleCanvasZoomIn = () => {
    zoom <= 280 && setZoom(zoom + 20);
  };

  const handleCanvasZoomOut = () => {
    zoom >= 120 && setZoom(zoom - 20);
  };
  return (
    <div className="cart">
      <div className="wrapper">
        <div className="panel cart">
          <div className="panel--header with-border">
            <Tab selectedTab={selectedTab} tabs={tabs} setSelectedTab={setSelectedTab} />
          </div>
          <div className="panel--content cart-content">
            <div className="cart-content--header">
              <Button type="primary" classes="button--icon is-medium">
                <RemoveIcon />
              </Button>
              <Zoom
                styles={{ position: 'static', marginLeft: 'auto' }}
                zoomPercent={zoom}
                zoomIn={handleCanvasZoomIn}
                zoomOut={handleCanvasZoomOut}
              />
            </div>
            <div style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', minHeight: 'inherit', overflow: 'auto',
            }}
            >
              <DrawGridWithCubesId zoom={zoom} />
            </div>
          </div>
          <div className="panel--footer">
            <UploadImgBtn uploadedFile={uploadedFile} setUploadedFile={setUploadedFile} />
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
