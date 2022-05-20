import { useEffect, useRef, useState } from 'react';
import CubesMain from '../components/Cubes/CubesMain';
import CubesStatistic from '../components/Cubes/CubesStatistic/CubesStatistic';
import SelectedCubesBar from '../components/Cubes/SelectedCubesBar/SelectedCubesBar';
import Zoom from '../components/Cubes/Zoom/Zoom';

const Cubes = () => {
  const [zoomPercent, setZoomPercent] = useState<number>(100);
  const [methods, setMethods] = useState<CubesMainMethods | null>(null);
  const cubesMainMethods = useRef<CubesMainMethods>();

  useEffect(() => {
    if (cubesMainMethods.current) {
      setMethods(cubesMainMethods.current);
    }
  }, []);
  return (
    <div>
      <CubesMain setZoomPercent={setZoomPercent} setMethods={setMethods} />
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
