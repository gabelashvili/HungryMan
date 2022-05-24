import MinusIcon from '../../../Icons/MinusIcon';
import PlusIcon from '../../../Icons/PlusIcon';
import './zoom.scss';

const Zoom = ({
  zoomPercent,
  zoomIn,
  zoomOut,
  styles,
}: {zoomPercent:number,
  zoomIn?: () => void, zoomOut?: () => void, styles?: any}) => {
  return (
    <div className="zoom" style={styles}>
      <button className="zoom--button" onClick={zoomOut}>
        <MinusIcon />
      </button>
      <span className="zoom--value">
        {Math.floor(zoomPercent)}
        %
      </span>
      <button className="zoom--button" onClick={zoomIn}>
        <PlusIcon />
      </button>
    </div>
  );
};

export default Zoom;
