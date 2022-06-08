import {
  Dispatch, SetStateAction, useEffect, useRef,
} from 'react';
import { getCssMatrix } from '../../../helpers';
import MinusIcon from '../../../Icons/MinusIcon';
import PlusIcon from '../../../Icons/PlusIcon';
import './zoom.scss';

const Zoom = ({
  zoomPercent,
  zoomIn,
  zoomOut,
  styles,
  setZoomPercent,
}: PropsTypes) => {
  const timer = useRef<any>();
  timer.current = () => setTimeout(() => {
    const el = document.getElementsByClassName('react-transform-component ')[0];
    setZoomPercent(getCssMatrix(el)[0] * 100);
  }, 300);

  useEffect(() => {
    return () => window.clearTimeout(timer.current);
  }, []);

  return (
    <div className="zoom" style={styles}>
      <button
        className="zoom--button"
        onClick={() => {
          zoomOut && zoomOut();
          timer.current();
        }}
      >
        <MinusIcon />
      </button>
      <span className="zoom--value">
        {Math.floor(zoomPercent)}
        %
      </span>
      <button
        className="zoom--button"
        onClick={() => {
          zoomIn && zoomIn();
          timer.current();
        }}
      >
        <PlusIcon />
      </button>
    </div>
  );
};

export default Zoom;

interface PropsTypes {
  setZoomPercent: Dispatch<SetStateAction<number>>,
  zoomPercent:number,
  zoomIn?: () => void,
   zoomOut?: () => void, styles?: any
}
