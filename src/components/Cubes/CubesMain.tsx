import {
  MouseEvent,
  useRef, WheelEvent,
} from 'react';

const ROWS = 354;
const COLUMNS = 113;
const WIDTH = 20;
const HEIGHT = 20;

const CubesMain = () => {
  const ref = useRef<SVGSVGElement>(null);
  const isMouseClicked = useRef<boolean>(false);
  const handleZoomIn = () => {
    if (ref.current) {
      const currentProps = ref.current.getAttribute('viewBox')?.split(' ') || [];
      const width = Number(currentProps[2]) - (Number(currentProps[2]) * 10) / 100;
      const height = Number(currentProps[3]) - (Number(currentProps[3]) * 10) / 100;
      ref.current?.setAttribute('viewBox', `0 0 ${width} ${height}`);
    }
  };
  const handleZoomOut = () => {
    if (ref.current) {
      const currentProps = ref.current.getAttribute('viewBox')?.split(' ') || [];
      const width = Number(currentProps[2]) + (Number(currentProps[2]) * 10) / 100;
      const height = Number(currentProps[3]) + (Number(currentProps[3]) * 10) / 100;
      if (ROWS * WIDTH >= width && COLUMNS * HEIGHT >= height) {
        ref.current?.setAttribute('viewBox', `0 0 ${width} ${height}`);
      }
    }
  };

  const handleRightScroll = () => {
    if (ref.current) {
      const currentProps = ref.current.getAttribute('viewBox')?.split(' ') || [];
      const viewBoxX = Number(currentProps[0]);
      const viewBoxWidth = Number(currentProps[2]);
      const viewBoxHeight = Number(currentProps[3]);
      const visibleCubesNumber = Math.floor(viewBoxWidth / WIDTH);
      if (WIDTH * ROWS - WIDTH * visibleCubesNumber > viewBoxX) {
        ref.current?.setAttribute('viewBox', `${viewBoxX + 50} 0 ${viewBoxWidth} ${viewBoxHeight}`);
      }
    }
  };

  const handleLeftScroll = () => {
    if (ref.current) {
      const currentProps = ref.current.getAttribute('viewBox')?.split(' ') || [];
      const viewBoxX = Number(currentProps[0]);
      const viewBoxWidth = Number(currentProps[2]);
      const viewBoxHeight = Number(currentProps[3]);
      if (viewBoxX > 0) {
        ref.current?.setAttribute('viewBox', `${viewBoxX - 50} 0 ${viewBoxWidth} ${viewBoxHeight}`);
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

  const handleMouseMove = (e: MouseEvent) => {
    if (isMouseClicked.current) {
      let direction = '';
      if (e.movementY > 0 && e.movementX === 0) {
        direction = 'down';
      } else if (e.movementY < 0 && e.movementX === 0) {
        direction = 'up';
      } else if (e.movementX > 0 && e.movementY === 0) {
        direction = 'right';
        handleLeftScroll();
      } else if (e.movementX < 0 && e.movementY === 0) {
        direction = 'left';
        handleRightScroll();
      }
      console.log(direction);
    }
  };
  return (
    <div style={{ width: '100%', height: '800px' }}>
      <button onClick={handleZoomIn}>increase</button>
      <button onClick={handleZoomOut}>decrease</button>
      <button onClick={handleLeftScroll}>handleLeftScroll</button>
      <button onClick={handleRightScroll}>handleRightScroll</button>
      <svg
        viewBox={`0 0 ${ROWS * (WIDTH) + 5} ${COLUMNS * HEIGHT}`}
        ref={ref}
        onWheel={handleMouseWheel}
        onMouseDown={() => {
          isMouseClicked.current = true;
        }}
        onMouseUp={() => {
          isMouseClicked.current = false;
        }}
        onMouseMove={handleMouseMove}
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
