import {
  Dispatch, SetStateAction, useRef,
} from 'react';
import MinusIcon from '../../../Icons/MinusIcon';
import PlusIcon from '../../../Icons/PlusIcon';
import './zoom.scss';

const Zoom = ({
  scale,
  setScale,
}: PropsTypes) => {
  const timer = useRef<any>();

  return (
    <div className="zoom" style={{ position: 'static', marginLeft: 'auto' }}>
      <button
        className="zoom--button"
        onClick={() => {
          setScale(scale - 0.2);
          timer.current();
        }}
      >
        <MinusIcon />
      </button>
      <span className="zoom--value">
        {Math.floor(scale * 100)}
        %
      </span>
      <button
        className="zoom--button"
        onClick={() => {
          setScale(scale + 0.2);
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
 scale: number,
 setScale: Dispatch<SetStateAction<number>>
}
