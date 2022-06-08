import {
  Dispatch,
  SetStateAction,
  useEffect, useRef, useState,
} from 'react';
import { TransformWrapper, TransformComponent, ReactZoomPanPinchRef } from '@kokarn/react-zoom-pan-pinch';
import {
  CUBES_TOTAL_COLUMNS, CUBES_TOTAL_ROWS, CUBE_DARK_COLOR, CUBE_LIGHT_COLOR,
} from '../../Routes/Cubes/Cubes';

const Wall = ({ setMethods, setZoomPercent }: PropsTypes) => {
  const panRef = useRef<ReactZoomPanPinchRef>(null);
  const [ctx, setCtx] = useState<CanvasRenderingContext2D | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

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
      );
    }
  }, [ctx]);

  return (
    <div style={{ width: '100%' }}>
      <TransformWrapper
        doubleClick={{
          disabled: true,
        }}
        ref={panRef}
        onInit={(x) => setMethods({
          handleZoomIn: x.zoomIn,
          handleZoomOut: x.zoomOut,
        })}
        onZoomStop={(props) => {
          setZoomPercent(props.state.scale * 100);
        }}
      >
        <TransformComponent>
          <canvas
            ref={canvasRef}
            style={{ width: '100%' }}
          />
        </TransformComponent>
      </TransformWrapper>
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
) => {
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

interface PropsTypes {
  setMethods: Dispatch<SetStateAction<{
    handleZoomIn: () => void
    handleZoomOut: () => void
  } | null>>,
  setZoomPercent: Dispatch<SetStateAction<number>>
}
