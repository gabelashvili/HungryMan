import { CUBES_TOTAL_COLUMNS, CUBES_TOTAL_ROWS } from '../../../Routes/Cubes/Cubes';
import './sold-coubs-count-bar.component.scss';

const SoldCubesCountBar = ({ soldCubesCnt, soldCubesPercent }: {soldCubesCnt: number, soldCubesPercent: number}) => {
  return (
    <div className="panel">
      <div className="panel--header">
        <h3 className="panel--title">გაყიდული უჯრების რაოდენობა</h3>

        <div className="sold-coubs">
          <span className="sold-coubs--number">
            {soldCubesCnt}
            /
          </span>
          <span className="sold-coubs--number full">{CUBES_TOTAL_COLUMNS * CUBES_TOTAL_ROWS}</span>
        </div>
      </div>

      <div className="panel--content">
        <div className="sold-coubs--gradient">
          <span style={{ width: `${Math.ceil(soldCubesPercent) !== 0 && Math.ceil(soldCubesPercent) < 3 ? 3 : soldCubesPercent}%` }} />
        </div>
      </div>
    </div>

  );
};

export default SoldCubesCountBar;
