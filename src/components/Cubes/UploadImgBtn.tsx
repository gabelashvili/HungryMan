import {
  Dispatch, SetStateAction,
} from 'react';
import ReloadIcon from '../../Icons/ReloadIcon';
import Button from '../shared/Button';

const UploadImgBtn = ({ uploadedFile, setUploadedFile }: PropsTypes) => {
  return (
    <div className="cart-upload">
      <label className="button button--upload is-large" htmlFor="upload">
        <input
          id="upload"
          type="file"
          onChange={(e) => {
            e.target.files && setUploadedFile(e.target.files[0]);
            e.target.value = '';
          }}
          accept="image/*"
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
    uploadedFile: File | null,
     setUploadedFile: Dispatch<SetStateAction<File | null>>
}
