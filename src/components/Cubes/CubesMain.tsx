import {
  Dispatch,
  memo,
  MouseEvent,
  SetStateAction,
  useEffect,
  useRef, WheelEvent,
} from 'react';
import { useSelector } from '../../hooks/useSelector';

const WIDTH = 20;
const HEIGHT = 20;
const SCROLL_STEP = 5;

// cube type = selected | new | null

const CubesMain = ({
  setZoomPercent, setMethods, setAuthedUserSelectedCubes, totalRows, totalColumns,
}: PropsTypes) => {
  const authedUserId = useSelector((state) => state.userReducer.user?.id);
  const mainRef = useRef<SVGSVGElement>(null);
  const isMouseClicked = useRef<boolean>(false);
  const authedUserSelectedCubes = useRef<number[]>([]);
  const isSelecting = useRef<boolean>(false);
  const handleZoomIn = () => {
    if (mainRef.current) {
      const initialWidth = WIDTH * totalRows;
      const currentProps = mainRef.current.getAttribute('viewBox')?.split(' ') || [];
      const width = Number(currentProps[2]) - (Number(currentProps[2]) * 10) / 100;
      const height = Number(currentProps[3]) - (Number(currentProps[3]) * 10) / 100;
      const zoomedPercent = (initialWidth / width) * 100;
      const viewBoxX = Number(currentProps[0]);
      const viewBoxY = Number(currentProps[1]);
      mainRef.current?.setAttribute('viewBox', `${viewBoxX} ${viewBoxY} ${width} ${height}`);
      setZoomPercent(zoomedPercent);
    }
  };
  const handleZoomOut = () => {
    if (mainRef.current) {
      const initialWidth = WIDTH * totalRows;
      const initialHeight = HEIGHT * totalColumns;
      const currentProps = mainRef.current.getAttribute('viewBox')?.split(' ') || [];
      const viewBoxX = Number(currentProps[0]);
      const viewBoxY = Number(currentProps[1]);
      const viewBoxWidth = Number(currentProps[2]) + (Number(currentProps[2]) * 10) / 100;
      const viewBoxHeight = Number(currentProps[3]) + (Number(currentProps[3]) * 10) / 100;
      const shouldBeVisible = (viewBoxWidth / WIDTH);
      const currentVisibleCubesNumber = ((initialWidth - viewBoxX) / WIDTH);
      const shouldBeVisibletotalColumns = (viewBoxHeight / HEIGHT);
      const currentVisibleCubesNumbertotalColumns = ((initialHeight - viewBoxX) / HEIGHT);
      const zoomedPercent = (initialWidth / viewBoxWidth) * 100;

      if (totalRows * WIDTH >= viewBoxWidth && totalColumns * HEIGHT >= viewBoxHeight) {
        setZoomPercent(zoomedPercent);
        mainRef.current?.setAttribute('viewBox', `${shouldBeVisible !== currentVisibleCubesNumber ? 0 : viewBoxX} ${shouldBeVisibletotalColumns !== currentVisibleCubesNumbertotalColumns ? 0 : viewBoxY} ${viewBoxWidth} ${viewBoxHeight}`);
      } else {
        setZoomPercent(100);
        mainRef.current?.setAttribute('viewBox', `${viewBoxX} ${viewBoxY} ${initialWidth} ${initialHeight}`);
      }
    }
  };

  const handleRightScroll = () => {
    if (mainRef.current) {
      const currentProps = mainRef.current.getAttribute('viewBox')?.split(' ') || [];
      const viewBoxX = Number(currentProps[0]);
      const viewBoxY = Number(currentProps[1]);
      const viewBoxWidth = Number(currentProps[2]);
      const viewBoxHeight = Number(currentProps[3]);
      const maxScrollX = WIDTH * totalRows - viewBoxWidth;
      const visibleCubesNumber = Math.floor((viewBoxX + viewBoxWidth) / WIDTH);
      const hiddenCubesNumber = totalRows - visibleCubesNumber;
      const oneCubeWidth = maxScrollX / hiddenCubesNumber;
      if (hiddenCubesNumber >= SCROLL_STEP && viewBoxX + SCROLL_STEP * oneCubeWidth <= maxScrollX) {
        mainRef.current?.setAttribute('viewBox', `${viewBoxX + SCROLL_STEP * oneCubeWidth} ${viewBoxY} ${viewBoxWidth} ${viewBoxHeight}`);
      } else {
        mainRef.current?.setAttribute('viewBox', `${maxScrollX} ${viewBoxY} ${viewBoxWidth} ${viewBoxHeight}`);
      }
    }
  };

  const handleLeftScroll = () => {
    if (mainRef.current) {
      const currentProps = mainRef.current.getAttribute('viewBox')?.split(' ') || [];
      const viewBoxX = Number(currentProps[0]);
      const viewBoxY = Number(currentProps[1]);
      const viewBoxWidth = Number(currentProps[2]);
      const viewBoxHeight = Number(currentProps[3]);
      const maxScrollX = WIDTH * totalRows - viewBoxWidth;
      const visibleCubesNumber = Math.floor((viewBoxX + viewBoxWidth) / WIDTH);
      const hiddenCubesNumber = totalRows - visibleCubesNumber;
      const oneCubeWidth = maxScrollX / hiddenCubesNumber;
      if (viewBoxX - SCROLL_STEP * oneCubeWidth > 0) {
        mainRef.current?.setAttribute('viewBox', `${viewBoxX - SCROLL_STEP * oneCubeWidth} ${viewBoxY} ${viewBoxWidth} ${viewBoxHeight}`);
      } else {
        mainRef.current?.setAttribute('viewBox', `${0} ${viewBoxY} ${viewBoxWidth} ${viewBoxHeight}`);
      }
    }
  };

  const handleDownScroll = () => {
    if (mainRef.current) {
      const currentProps = mainRef.current.getAttribute('viewBox')?.split(' ') || [];
      const viewBoxX = Number(currentProps[0]);
      const viewBoxY = Number(currentProps[1]);
      const viewBoxWidth = Number(currentProps[2]);
      const viewBoxHeight = Number(currentProps[3]);
      const maxScrollY = HEIGHT * totalColumns - viewBoxHeight;
      const visibleCubesNumber = Math.floor((viewBoxY + viewBoxHeight) / HEIGHT);
      const hiddenCubesNumber = totalColumns - visibleCubesNumber;
      const oneCubeWidth = maxScrollY / hiddenCubesNumber;
      if (hiddenCubesNumber >= SCROLL_STEP && viewBoxY + SCROLL_STEP * oneCubeWidth <= maxScrollY) {
        mainRef.current?.setAttribute('viewBox', `${viewBoxX} ${viewBoxY + SCROLL_STEP * oneCubeWidth} ${viewBoxWidth} ${viewBoxHeight}`);
      } else {
        mainRef.current?.setAttribute('viewBox', `${viewBoxX} ${maxScrollY} ${viewBoxWidth} ${viewBoxHeight}`);
      }
    }
  };

  const handleUpScroll = () => {
    if (mainRef.current) {
      const currentProps = mainRef.current.getAttribute('viewBox')?.split(' ') || [];
      const viewBoxX = Number(currentProps[0]);
      const viewBoxY = Number(currentProps[1]);
      const viewBoxWidth = Number(currentProps[2]);
      const viewBoxHeight = Number(currentProps[3]);
      const maxScrollY = HEIGHT * totalColumns - viewBoxHeight;
      const visibleCubesNumber = Math.floor((viewBoxY + viewBoxHeight) / HEIGHT);
      const hiddenCubesNumber = totalColumns - visibleCubesNumber;
      const oneCubeWidth = maxScrollY / hiddenCubesNumber;
      if (viewBoxY - SCROLL_STEP * oneCubeWidth > 0) {
        mainRef.current?.setAttribute('viewBox', `${viewBoxX} ${viewBoxY - SCROLL_STEP * oneCubeWidth} ${viewBoxWidth} ${viewBoxHeight}`);
      } else {
        mainRef.current?.setAttribute('viewBox', `${viewBoxX} ${0} ${viewBoxWidth} ${viewBoxHeight}`);
      }
    }
  };

  const handleMouseWheel = (e: WheelEvent) => {
    if (e.deltaY < 0) {
      handleZoomIn();
    } else {
      handleZoomOut();
    }
  };

  const isValidCubeForSelect = (target: HTMLElement) => {
    const cubeId = target.getAttribute('id');
    const isSelected = target.getAttribute('userId');
    // const selectedCubeY = Math.ceil(Number(cubeId) / totalRows);
    // const selectedCubeX = Number(cubeId) - (selectedCubeY - 1) * totalRows;
    const topNeighborCubeUserId = document.getElementById((Number(cubeId) - totalRows).toString())?.getAttribute('userId');
    const bottomNeighborCubeUserId = document.getElementById((Number(cubeId) + totalRows).toString())?.getAttribute('userId');
    const leftNeighborCubeUserId = document.getElementById((Number(cubeId) - 1).toString())?.getAttribute('userId');
    const rightNeighborCubeUserId = document.getElementById((Number(cubeId) + 1).toString())?.getAttribute('userId');
    if (isSelected) {
      isSelecting.current = false;
      isMouseClicked.current = false;
      return false;
    }
    if (authedUserSelectedCubes.current.length === 0) {
      return true;
    }
    if (authedUserSelectedCubes.current.length > 0
       && (
         topNeighborCubeUserId === authedUserId?.toString()
         || bottomNeighborCubeUserId === authedUserId?.toString()
         || leftNeighborCubeUserId === authedUserId?.toString()
         || rightNeighborCubeUserId === authedUserId?.toString())) {
      return true;
    }
    return false;
  };

  const handleCubeSelect = (target: HTMLElement) => {
    const isSelected = target.getAttribute('userId');
    const currentCubeId = target.getAttribute('id');
    if (!isSelected && currentCubeId && authedUserId && isValidCubeForSelect(target)) {
      authedUserSelectedCubes.current.push(Number(currentCubeId));
      setAuthedUserSelectedCubes([...authedUserSelectedCubes.current]);
      target.setAttribute('userId', authedUserId?.toString());
      target.setAttribute('type', 'new');
      target.setAttribute('originalColor', target.getAttribute('style')?.split(':')[1].replace(';', '') || '');
      target.style.fill = 'grey';
    }
  };

  const deselectCube = (target: HTMLElement) => {
    const color = target.getAttribute('originalColor');
    target.style.fill = color || '';
    target.removeAttribute('userId');
    target.removeAttribute('type');
    target.removeAttribute('originalColor');
    authedUserSelectedCubes.current = authedUserSelectedCubes.current.filter((id) => id !== Number(target.getAttribute('id')));
    setAuthedUserSelectedCubes(authedUserSelectedCubes.current);
  };

  const handleCubeDeselect = (target: HTMLElement) => {
    console.log(target, deselectCube);
    deselectCube(target);
  };

  const handleCubeClick = (e: MouseEvent<SVGRectElement | SVGElement | null>) => {
    const target = e.target as HTMLElement;
    const type = target.getAttribute('type');
    const userId = target.getAttribute('userId');
    if (!type) {
      handleCubeSelect(target);
    }
    if (type === 'new' && Number(userId) === authedUserId && !isSelecting.current) {
      console.log('deselect');
      console.log(handleCubeDeselect(target));
    }
  };

  const handleMultipleCubeSelect = (e: MouseEvent<SVGElement>) => {
    isMouseClicked.current && handleCubeClick(e);
    isSelecting.current = true;
  };

  useEffect(() => {
    setMethods({
      handleZoomIn,
      handleZoomOut,
      handleRightScroll,
      handleLeftScroll,
    });
  }, []);

  return (
    <div style={{
      width: '100%', height: '100%', display: 'flex', justifyContent: 'center', flexDirection: 'column',
    }}
    >
      <button onClick={handleLeftScroll}>handleLeftScroll</button>
      <button onClick={handleRightScroll}>handleRightScroll</button>
      <button onClick={handleDownScroll}>handleDownScroll</button>
      <button onClick={handleUpScroll}>handleUpScroll</button>
      <svg
        viewBox={`0 0 ${totalRows * (WIDTH)} ${totalColumns * HEIGHT}`}
        ref={mainRef}
        onWheel={handleMouseWheel}
        onMouseDown={() => {
          isMouseClicked.current = true;
          setAuthedUserSelectedCubes(authedUserSelectedCubes.current);
        }}
        onMouseUp={() => {
          isMouseClicked.current = false;
          isSelecting.current = false;
          setAuthedUserSelectedCubes(authedUserSelectedCubes.current);
        }}
        onMouseLeave={() => {
          isMouseClicked.current = false;
          isSelecting.current = false;
          setAuthedUserSelectedCubes(authedUserSelectedCubes.current);
        }}
        onMouseMove={(e) => handleMultipleCubeSelect(e)}
      >
        {renderCubes(handleCubeClick, totalRows, totalColumns)}
      </svg>
    </div>
  );
};

export default memo(CubesMain);

const renderCubes = (
  handleCubeClick: (e: MouseEvent<SVGRectElement | null>) => void,
  totalRows: number,
  totalColumns: number,
) => {
  const cubes = [];
  // let color = 'red';
  let color = '#09141E';
  for (let i = 0; i < totalColumns; i++) {
    for (let j = 0; j < totalRows; j++) {
      const x = j * WIDTH;
      const y = i * HEIGHT;
      const el = (
        <rect
          width={WIDTH}
          height={HEIGHT}
          x={x}
          y={y}
          style={{ fill: color }}
          key={i * totalRows + j}
          id={(i * totalRows + j + 1).toString()}
          onClick={(e) => handleCubeClick(e)}
        />
      );
      cubes.push(el);
      // color = color === 'red' ? 'green' : 'red';
      color = color === '#09141E' ? '#0C1925' : '#09141E';
    }
    // color = color === 'red' ? 'green' : 'red';
    color = color === '#09141E' ? '#0C1925' : '#09141E';
  }
  return cubes;
};

interface PropsTypes {
  setZoomPercent: Dispatch<SetStateAction<number>>,
  setMethods: Dispatch<SetStateAction<any>>,
  setAuthedUserSelectedCubes: Dispatch<SetStateAction<number[]>>
  totalRows: number,
  totalColumns: number
}
