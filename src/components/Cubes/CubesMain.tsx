import { useEffect, useRef } from 'react';

const CUBE_INITIAL_WIDTH = 20;
const CUBE_INITIAL_HEIGHT = 20;

const CubesMain = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const drawSquare = () => {
    if (canvasRef.current) {
      const context = canvasRef.current.getContext('2d');
      const x = Math.floor(Math.random() * canvasRef.current.width);
      const y = Math.floor(Math.random() * canvasRef.current.height);
      if (context) {
        context.fillStyle = 'pink';
        context.fillRect(x, y, canvasRef.current.width, canvasRef.current.height);
      }
    }
  };

  useEffect(() => {
    if (canvasRef.current) {
      drawSquare();
    }
  }, []);
  return (
    <div style={{ width: '100%' }}>
      <canvas ref={canvasRef} width="100%" height="100%" style={{ background: 'white' }} />
    </div>
  );
};

export default CubesMain;
