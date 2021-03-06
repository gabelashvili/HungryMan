import {
  ChangeEvent,
} from 'react';
import { toast } from 'react-toastify';
import { getBase64 } from '../../helpers';
import ReloadIcon from '../../Icons/ReloadIcon';
import Button from '../shared/Button';

const UploadImgBtn = ({ uploadedFile, setUploadedFile }: PropsTypes) => {
  const handleFileUpload = async (e:ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];
      const base64 = await getBase64(file) as string;
      const image = new Image();
      image.src = base64;
      const imageWidth = image.width;
      const imageHeight = image.height;
      const imageSize = Number((file.size / 1024 / 1024).toFixed(2));
      if (imageWidth > 2500 || imageHeight > 2500) {
        toast.error('მაქსიმალური გაფართოება უნდა იყოს: 2500x2500');
      } else if (imageSize > 15) {
        toast.error('მაქსიმალური ზომა უნდა იყოს 15MB');
      } else {
        setUploadedFile(e.target.files[0], base64);
      }
      e.target.value = '';
    }
  };
  return (
    <div className="cart-upload">
      <label className="button button--upload is-large" htmlFor="upload">
        <input
          id="upload"
          type="file"
          onChange={handleFileUpload}
          accept="image/jpg, image/jpeg, image/tif, image/svg, image/png"
        />
        <span className="button--upload__text">
          {uploadedFile ? uploadedFile.name : 'ფოტოს არჩევა'}
        </span>
        <span className="button--upload__loader"> </span>
        <Button type="icon" classes="is-rounded is-xs">
          <ReloadIcon />
        </Button>
      </label>
      <p className="cart-upload--text">
        გაითვალისწინე რომ ფოტოს მაქსიმალური ზომა უნდა იყოს 15MB და მაქსიმალური
        გაფართოება 2500x2500დასაშვები ფორმატებია: .jpg .tif .svg
      </p>
    </div>
  );
};

export default UploadImgBtn;

interface PropsTypes {
    uploadedFile?: File | null,
    setUploadedFile: (file: File, base64: string) => void
}
