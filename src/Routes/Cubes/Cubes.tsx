import { useEffect, useRef, useState } from 'react';
import CubesMain from '../../components/Cubes/CubesMain';
import CubesStatistic from '../../components/Cubes/CubesStatistic/CubesStatistic';
import SelectedCubesBar from '../../components/Cubes/SelectedCubesBar/SelectedCubesBar';
import Zoom from '../../components/Cubes/Zoom/Zoom';
import { useAppDispatch } from '../../hooks/useSelector';
import { setSelectedCubes } from '../../store/ducks/cubesDuck';

export const CUBES_TOTAL_ROWS = 20;
export const CUBES_TOTAL_COLUMNS = 5;
export const INITIAL_CUBE_SIZE = 20;
export const CUBE_LIGHT_COLOR = '#0C1925';
export const CUBE_DARK_COLOR = '#09141E';
export const FIRST_CUBE_COLOR = CUBE_DARK_COLOR;
const Cubes = () => {
  const dispatch = useAppDispatch();
  const [zoomPercent, setZoomPercent] = useState<number>(100);
  const [authedUserSelectedCubes, setAuthedUserSelectedCubes] = useState<number[]>([]);
  const [methods, setMethods] = useState<CubesMainMethods | null>(null);
  const cubesMainMethods = useRef<CubesMainMethods>();

  useEffect(() => {
    if (cubesMainMethods.current) {
      setMethods(cubesMainMethods.current);
    }
  }, []);

  useEffect(() => {
    dispatch(setSelectedCubes(authedUserSelectedCubes));
  }, [authedUserSelectedCubes]);
  return (
    <div style={{ display: 'flex', justifyContent: 'center', height: '100%' }}>
      <CubesMain
        setZoomPercent={setZoomPercent}
        setMethods={setMethods}
        setAuthedUserSelectedCubes={setAuthedUserSelectedCubes}
        totalRows={CUBES_TOTAL_ROWS}
        totalColumns={CUBES_TOTAL_COLUMNS}
      />
      <CubesStatistic />
      <SelectedCubesBar />
      <Zoom
        zoomPercent={zoomPercent}
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
  handleRightScroll: () => void
  handleLeftScroll: () => void
}