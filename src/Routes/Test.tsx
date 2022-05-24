import { useEffect, useRef, useState } from 'react';

const Test = () => {
  const [ctx, setCtx] = useState<CanvasRenderingContext2D| null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const drawGrid = (w, h) => {
    ctx.canvas.width = w;
    ctx.canvas.height = h;

    for (let x = 0; x <= w; x += 20) {
      ctx.moveTo(x, 0);
      ctx.lineTo(x, h);
      for (let y = 0; y <= h; y += 20) {
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
      }
    }
    ctx.stroke();
  };

  // set context
  useEffect(() => {
    if (canvasRef.current) {
      const context = canvasRef.current.getContext('2d');
      setCtx(context);
    }
  }, []);

  // draw initial grid

  useEffect(() => {
    if (ctx) {
      drawGrid(800, 400, 'grid');
    }
  }, [ctx]);
  return (
    <canvas ref={canvasRef} />
  );
};

export default Test;
