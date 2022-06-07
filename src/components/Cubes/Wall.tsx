import { useEffect, useRef, useState } from 'react';
import {
  CUBES_TOTAL_COLUMNS, CUBES_TOTAL_ROWS, CUBE_DARK_COLOR, CUBE_LIGHT_COLOR,
} from '../../Routes/Cubes/Cubes';

const Wall = () => {
  const [ctx, setCtx] = useState<CanvasRenderingContext2D | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // set context
  useEffect(() => {
    if (canvasRef.current) {
      const context = canvasRef.current.getContext('2d');
      setCtx(context);
    }
  }, []);

  // draw initial cubes

  useEffect(() => {
    if (ctx && canvasRef.current) {
      let color = CUBE_DARK_COLOR;
      const cubeSize = Math.round(canvasRef.current.width / CUBES_TOTAL_ROWS);
      for (let i = 0; i < CUBES_TOTAL_COLUMNS; i++) {
        for (let j = 0; j < CUBES_TOTAL_ROWS; j++) {
          const x = j * cubeSize;
          const y = i * cubeSize;
          drawRect(ctx, x, y, cubeSize, cubeSize, color);
          color = color === CUBE_DARK_COLOR ? CUBE_LIGHT_COLOR : CUBE_DARK_COLOR;
        }
        color = color === CUBE_DARK_COLOR ? CUBE_LIGHT_COLOR : CUBE_DARK_COLOR;
      }
    }
  }, [ctx]);
  return (
    <canvas ref={canvasRef} style={{ width: '100%' }} />
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
