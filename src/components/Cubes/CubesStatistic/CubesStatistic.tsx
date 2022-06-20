import { useState } from 'react';
import { useSelector } from '../../../hooks/useSelector';
import QuestionMarkIcon from '../../../Icons/QuestionMarkIcon';
import { CUBES_TOTAL_COLUMNS, CUBES_TOTAL_ROWS } from '../../../Routes/Cubes/Cubes';
import InfoModal from '../../InfoModal/InfoModal';
import Button from '../../shared/Button';
import './cubes-statistic.scss';

const CubesStatistic = () => {
  const [showInfoModal, setShowInfoModal] = useState(false);
  const soldCubes = useSelector((state) => state.cubesReducer.soldCubesDetails?.soldCubes.length) || 0;
  const soldCubesPercent = soldCubes / (CUBES_TOTAL_ROWS * CUBES_TOTAL_COLUMNS * 100);
  return (
    <>
      <InfoModal
        soldCubesPercent={soldCubesPercent}
        soldCubesCnt={soldCubes}
        open={showInfoModal}
        toggle={setShowInfoModal}
      />
      <div className="coub-stats-wrapper">
        <div className="coub-stats">
          <span className="coub-stats--number">
            {soldCubes}
          </span>
          /
          <span className="coub-stats--number">
            {CUBES_TOTAL_ROWS * CUBES_TOTAL_COLUMNS}
          </span>
          <div className="coub-stats--gradient">
            {/* <!-- apply percentage value in width --> */}
            <span style={{ width: `${soldCubesPercent}%` }} />
          </div>
        </div>
        <Button type="none" classes="coub-stats--button" handleClick={() => setShowInfoModal(true)}>
          <QuestionMarkIcon />
        </Button>
      </div>
    </>
  );
};

export default CubesStatistic;
