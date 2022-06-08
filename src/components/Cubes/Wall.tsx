import {
  MouseEvent,
  useEffect, useRef, useState, WheelEvent,
} from 'react';
import {
  CUBES_TOTAL_COLUMNS, CUBES_TOTAL_ROWS, CUBE_DARK_COLOR, CUBE_LIGHT_COLOR,
} from '../../Routes/Cubes/Cubes';

const Wall = () => {
  const [canvasOptions, setCanvasOptions] = useState({
    panX: 0,
    panY: 0,
    scaleFactor: 1.00,
  });
  const [ctx, setCtx] = useState<CanvasRenderingContext2D | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseStartPos = useRef({ x: 0, y: 0 });

  const zoomIn = () => {
    setCanvasOptions({ ...canvasOptions, scaleFactor: canvasOptions.scaleFactor * 1.1 });
  };

  const zoomOut = () => {
    setCanvasOptions({ ...canvasOptions, scaleFactor: canvasOptions.scaleFactor / 1.1 });
  };

  const panUp = () => {
    setCanvasOptions({ ...canvasOptions, panY: canvasOptions.panY - 25 });
  };

  const panDown = () => {
    setCanvasOptions({ ...canvasOptions, panY: canvasOptions.panY + 25 });
  };

  const panLeft = () => {
    setCanvasOptions({ ...canvasOptions, panX: canvasOptions.panX - 25 });
  };

  const panRight = () => {
    setCanvasOptions({ ...canvasOptions, panX: canvasOptions.panX + 25 });
  };

  const onMouseWheel = (event:WheelEvent<HTMLCanvasElement>) => {
    event.deltaY < 0 ? zoomIn() : zoomOut();
  };

  const handleMouseDown = (e: MouseEvent) => {
    const startX = e.clientX;
    const startY = e.clientY;
    mouseStartPos.current = {
      x: startX,
      y: startY,
    };
  };

  const handleMouseMove = (e:MouseEvent) => {
    const { x, y } = mouseStartPos.current;
    setCanvasOptions({ ...canvasOptions, panX: canvasOptions.panX - (x - e.clientX) });
    console.log(x - e.clientX);
  };

  // set context
  useEffect(() => {
    if (canvasRef.current) {
      const cubeSize = Math.round(window.innerWidth / CUBES_TOTAL_ROWS);
      canvasRef.current.width = cubeSize * CUBES_TOTAL_ROWS;
      canvasRef.current.height = cubeSize * CUBES_TOTAL_COLUMNS;
      const context = canvasRef.current.getContext('2d');
      setCtx(context);
    }
  }, []);

  // draw and redraw cubes
  useEffect(() => {
    if (ctx && canvasRef.current) {
      const cubeSize = Math.round(canvasRef.current.width / CUBES_TOTAL_ROWS);
      redrawWall(
        ctx,
        canvasRef.current.width,
        canvasRef.current.height,
        cubeSize,
        canvasOptions.scaleFactor,
        canvasOptions.panX,
        canvasOptions.panY,
      );
    }
  }, [ctx, canvasOptions]);
  return (
    <div style={{ width: '100%' }}>
      <button onClick={zoomIn}>ZOOM IN</button>
      <button onClick={zoomOut}>ZOOM OUT</button>
      <button onClick={panUp}>PAN UP</button>
      <button onClick={panDown}>PAN DOWN</button>
      <button onClick={panLeft}>PAN LEFT</button>
      <button onClick={panRight}>PAN RIGHT</button>
      <canvas
        ref={canvasRef}
        style={{ width: '100%' }}
        onWheel={onMouseWheel}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
      />
    </div>
  );
};

export default Wall;

const drawRect = (
  ctx: CanvasRenderingContext2D,
  x:number,
  y:number,
  w:number,
  h: number,
  color: string,
) => {
  ctx.beginPath();
  ctx.fillStyle = color;
  ctx.fillRect(x, y, w, h);
  ctx.stroke();
};

const redrawWall = (
  ctx: CanvasRenderingContext2D,
  canvasWidth: number,
  canvasHeight: number,
  cubeSize: number,
  scaleFactor: number,
  panX: number,
  panY:number,
) => {
  console.log(canvasWidth * scaleFactor, canvasWidth / 2);
  ctx.clearRect(0, 0, canvasWidth, canvasHeight);
  ctx.save();
  ctx.transform(
    scaleFactor,
    0,
    0,
    scaleFactor,
    panX + (canvasWidth - canvasWidth * scaleFactor) / 2,
    panY + (canvasHeight - canvasHeight * scaleFactor) / 2,
  );
  let color = CUBE_DARK_COLOR;
  for (let i = 0; i < CUBES_TOTAL_COLUMNS; i++) {
    for (let j = 0; j < CUBES_TOTAL_ROWS; j++) {
      const x = j * cubeSize;
      const y = i * cubeSize;
      drawRect(ctx, x, y, cubeSize, cubeSize, i === 2 && j === 15 ? 'red' : color);
      color = color === CUBE_DARK_COLOR ? CUBE_LIGHT_COLOR : CUBE_DARK_COLOR;
    }
    color = color === CUBE_DARK_COLOR ? CUBE_LIGHT_COLOR : CUBE_DARK_COLOR;
  }
  ctx.restore();
};
