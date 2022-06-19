import { useEffect, useRef, useState } from 'react';
import CubesStatistic from '../../components/Cubes/CubesStatistic/CubesStatistic';
import SelectedCubesBar from '../../components/Cubes/SelectedCubesBar/SelectedCubesBar';
import Wall from '../../components/Cubes/Wall';
import Zoom from '../../components/Cubes/Zoom/Zoom';
import { useAppDispatch, useSelector } from '../../hooks/useSelector';
import { getInitialData } from '../../store/ducks/cubesDuck';

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
  const cubesMainMethods = useRef<CubesMainMethods>();

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

  return (
    <div style={{
      display: 'flex', justifyContent: 'center', height: '100%', flexDirection: 'column-reverse',
    }}
    >
      <Wall
        setMethods={setMethods}
        setZoomPercent={setZoomPercent}
        selectedCubes={selectedCubes}
        setSelectedCubes={setSelectedCubes}
      />
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
  );
};

export default Cubes;

interface CubesMainMethods {
  handleZoomIn: () => void
  handleZoomOut: () => void
}
