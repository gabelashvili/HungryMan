import { useEffect, useRef, useState } from 'react';
import isMobile from 'is-mobile';
import { ScreenOrientation } from '@ionic-native/screen-orientation';
import CubesStatistic from '../../components/Cubes/CubesStatistic/CubesStatistic';
import SelectedCubesBar from '../../components/Cubes/SelectedCubesBar/SelectedCubesBar';
import Wall from '../../components/Cubes/Wall';
import Zoom from '../../components/Cubes/Zoom/Zoom';
import { useAppDispatch, useSelector } from '../../hooks/useSelector';
import { getInitialData, setSelectedCubesInfo } from '../../store/ducks/cubesDuck';
import OrientationIcon from '../../Icons/OrientationIcon';

export const CUBES_TOTAL_ROWS = 354;
export const CUBES_TOTAL_COLUMNS = 113;
export const INITIAL_CUBE_SIZE = 20;
export const CUBE_LIGHT_COLOR = '#0C1925';
export const CUBE_DARK_COLOR = '#09141E';
export const FIRST_CUBE_COLOR = CUBE_DARK_COLOR;
const Cubes = () => {
  const dispatch = useAppDispatch();
  const [selectedCubes, setSelectedCubes] = useState<number[]>([]);
  const cubesInitialData = useSelector((state) => state.cubesReducer.initialData);
  const [zoomPercent, setZoomPercent] = useState<number>(100);
  const [methods, setMethods] = useState<CubesMainMethods | null>(null);
  const [showOrientationErr, setShowOrientationErr] = useState<boolean>(false);
  const cubesMainMethods = useRef<CubesMainMethods>();

  const showErr = () => {
    if (isMobile() && ScreenOrientation.type.includes('portrait') && window.screen.width <= 768) {
      return true;
    }
    return false;
  };

  const handleOrientationChange = () => {
    if (showOrientationErr && ScreenOrientation.type.includes('landscape')) {
      setShowOrientationErr(false);
    } else if (showErr()) {
      setShowOrientationErr(showErr());
    }
  };

  useEffect(() => {
    if (cubesMainMethods.current) {
      setMethods(cubesMainMethods.current);
    }
  }, []);

  useEffect(() => {
    if (!cubesInitialData) {
      dispatch(getInitialData());
    }
  }, [cubesInitialData]);

  useEffect(() => {
    if (selectedCubes.length !== 0) {
      dispatch(setSelectedCubesInfo({ key: 'cubesId', value: selectedCubes }));
    }
  }, [selectedCubes]);

  useEffect(() => {
    if (showErr()) {
      setShowOrientationErr(showErr());
    }
  }, []);

  useEffect(() => {
    window.addEventListener('orientationchange', handleOrientationChange);
    return () => {
      window.removeEventListener('orientationchange', handleOrientationChange);
    };
  }, [showOrientationErr]);

  return (
    <div style={{
      display: 'flex', justifyContent: 'center', height: '100%', flexDirection: 'column',
    }}
    >
      {showOrientationErr ? (
        <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
          <OrientationIcon />
          მოატრიალეთ ტელეფონი
        </div>
      ) : (
        <div style={{ position: 'relative', height: '100%' }}>
          <Wall
            setMethods={setMethods}
            setZoomPercent={setZoomPercent}
            selectedCubes={selectedCubes}
            setSelectedCubes={setSelectedCubes}
          />
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '0 30px',
            position: 'absolute',
            bottom: 0,
            width: '100%',
          }}
          >
            <CubesStatistic />
            <SelectedCubesBar
              cubePrice={cubesInitialData?.squarePrice || 0}
              selectedCubes={selectedCubes}
              setSelectedCubesInLocalState={setSelectedCubes}
            />
            <Zoom
              setScale={setZoomPercent}
              scale={zoomPercent / 100}
              zoomIn={methods?.handleZoomIn}
              zoomOut={methods?.handleZoomOut}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Cubes;

interface CubesMainMethods {
  handleZoomIn: () => void
  handleZoomOut: () => void
}
