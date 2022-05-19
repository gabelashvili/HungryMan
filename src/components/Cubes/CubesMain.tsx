import {
  useRef, WheelEvent,
} from 'react';

const ROWS = 354;
const COLUMNS = 113;
const WIDTH = 150;
const HEIGHT = 150;
const SCROLL_STEP = 5;

const CubesMain = () => {
  const ref = useRef<SVGSVGElement>(null);
  const isMouseClicked = useRef<boolean>(false);
  const handleZoomIn = () => {
    if (ref.current) {
      const currentProps = ref.current.getAttribute('viewBox')?.split(' ') || [];
      const width = Number(currentProps[2]) - (Number(currentProps[2]) * 10) / 100;
      const height = Number(currentProps[3]) - (Number(currentProps[3]) * 10) / 100;
      const viewBoxX = Number(currentProps[0]);
      const viewBoxY = Number(currentProps[1]);
      ref.current?.setAttribute('viewBox', `${viewBoxX} ${viewBoxY} ${width} ${height}`);
    }
  };
  const handleZoomOut = () => {
    if (ref.current) {
      const initialWidth = WIDTH * ROWS;
      const initialHeight = HEIGHT * COLUMNS;
      const currentProps = ref.current.getAttribute('viewBox')?.split(' ') || [];
      const viewBoxX = Number(currentProps[0]);
      const viewBoxY = Number(currentProps[1]);
      const viewBoxWidth = Number(currentProps[2]) + (Number(currentProps[2]) * 10) / 100;
      const viewBoxHeight = Number(currentProps[3]) + (Number(currentProps[3]) * 10) / 100;
      const shouldBeVisible = (viewBoxWidth / WIDTH);
      const currentVisibleCubesNumber = ((initialWidth - viewBoxX) / WIDTH);
      if (ROWS * WIDTH >= viewBoxWidth && COLUMNS * HEIGHT >= viewBoxHeight) {
        ref.current?.setAttribute('viewBox', `${shouldBeVisible !== currentVisibleCubesNumber ? 0 : viewBoxX} ${viewBoxY} ${viewBoxWidth} ${viewBoxHeight}`);
      } else {
        ref.current?.setAttribute('viewBox', `${viewBoxX} ${viewBoxY} ${initialWidth} ${initialHeight}`);
      }
    }
  };

  const handleRightScroll = () => {
    if (ref.current) {
      const currentProps = ref.current.getAttribute('viewBox')?.split(' ') || [];
      const viewBoxX = Number(currentProps[0]);
      const viewBoxY = Number(currentProps[1]);
      const viewBoxWidth = Number(currentProps[2]);
      const viewBoxHeight = Number(currentProps[3]);
      const maxScrollX = WIDTH * ROWS - viewBoxWidth;
      const visibleCubesNumber = Math.floor((viewBoxX + viewBoxWidth) / WIDTH);
      const hiddenCubesNumber = ROWS - visibleCubesNumber;
      const oneCubeWidth = maxScrollX / hiddenCubesNumber;
      if (hiddenCubesNumber >= SCROLL_STEP && viewBoxX + SCROLL_STEP * oneCubeWidth <= maxScrollX) {
        ref.current?.setAttribute('viewBox', `${viewBoxX + SCROLL_STEP * oneCubeWidth} ${viewBoxY} ${viewBoxWidth} ${viewBoxHeight}`);
      } else {
        ref.current?.setAttribute('viewBox', `${maxScrollX} ${viewBoxY} ${viewBoxWidth} ${viewBoxHeight}`);
      }
    }
  };

  const handleLeftScroll = () => {
    if (ref.current) {
      const currentProps = ref.current.getAttribute('viewBox')?.split(' ') || [];
      const viewBoxX = Number(currentProps[0]);
      const viewBoxY = Number(currentProps[1]);
      const viewBoxWidth = Number(currentProps[2]);
      const viewBoxHeight = Number(currentProps[3]);
      const maxScrollX = WIDTH * ROWS - viewBoxWidth;
      const visibleCubesNumber = Math.floor((viewBoxX + viewBoxWidth) / WIDTH);
      const hiddenCubesNumber = ROWS - visibleCubesNumber;
      const oneCubeWidth = maxScrollX / hiddenCubesNumber;
      if (viewBoxX - SCROLL_STEP * oneCubeWidth > 0) {
        ref.current?.setAttribute('viewBox', `${viewBoxX - SCROLL_STEP * oneCubeWidth} ${viewBoxY} ${viewBoxWidth} ${viewBoxHeight}`);
      } else {
        ref.current?.setAttribute('viewBox', `${0} ${viewBoxY} ${viewBoxWidth} ${viewBoxHeight}`);
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

  return (
    <div style={{ width: '100%', height: '800px' }}>
      <button onClick={handleZoomIn}>increase</button>
      <button onClick={handleZoomOut}>decrease</button>
      <button onClick={handleLeftScroll}>handleLeftScroll</button>
      <button onClick={handleRightScroll}>handleRightScroll</button>
      <svg
        viewBox={`0 0 ${ROWS * (WIDTH)} ${COLUMNS * HEIGHT}`}
        ref={ref}
        onWheel={handleMouseWheel}
        onMouseDown={() => {
          isMouseClicked.current = true;
        }}
        onMouseUp={() => {
          isMouseClicked.current = false;
        }}
        onMouseLeave={() => {
          isMouseClicked.current = false;
        }}
      >
        {renderCubes()}
      </svg>
    </div>
  );
};

export default CubesMain;

const renderCubes = () => {
  const cubes = [];
  let color = 'red';
  // let color = '#09141E';
  for (let i = 0; i < COLUMNS; i++) {
    for (let j = 0; j < ROWS; j++) {
      const x = j * WIDTH;
      const y = i * HEIGHT;
      const el = (
        <rect
          width={WIDTH}
          height={HEIGHT}
          x={x}
          y={y}
          style={{ fill: color }}
          key={i * ROWS + j}
          id={(i * ROWS + j + 1).toString()}
          onClick={(e) => console.log(e.target)}

        />
      );
      cubes.push(el);
      color = color === 'red' ? 'green' : 'red';
      // color = color === '#09141E' ? '#0C1925' : '#09141E';
    }
    color = color === 'red' ? 'green' : 'red';
    // color = color === '#09141E' ? '#0C1925' : '#09141E';
  }
  return cubes;
};
