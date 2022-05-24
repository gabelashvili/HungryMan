import { useState } from 'react';
import DrawGridWithCubesId from '../../../components/Cubes/DrawGridWithCubesId';
import UploadImgBtn from '../../../components/Cubes/UploadImgBtn';
import Tab from '../../../components/shared/Tab/Tab';

const CubesCart = () => {
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
  return (
    <div className="cart">
      <div className="wrapper">
        <div className="panel cart">
          <div className="panel--header with-border">
            <Tab selectedTab={selectedTab} tabs={tabs} setSelectedTab={setSelectedTab} />
          </div>
          <div className="panel--content cart-content" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <DrawGridWithCubesId />
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
