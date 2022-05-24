import { useEffect, useRef, useState } from 'react';
import { useSelector } from '../../hooks/useSelector';
import {
  CUBES_TOTAL_ROWS, CUBE_DARK_COLOR, CUBE_LIGHT_COLOR, FIRST_CUBE_COLOR, INITIAL_CUBE_SIZE,
} from '../../Routes/Cubes/Cubes';

const DrawGridWithCubesId = () => {
  const [ctx, setCtx] = useState<CanvasRenderingContext2D | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const selectedCubesId = useSelector((state) => state.cubesReducer.selectedCubes);

  // draw cubes based on selected cubes id
  useEffect(() => {
    if (selectedCubesId.length > 0 && ctx && canvasRef.current) {
      const res = generateFormattedData(selectedCubesId);
      const { width: canvasWidth } = canvasRef.current.getBoundingClientRect();
      const calculatedCubeWidth = Math.floor(canvasWidth / res.columnLength);
      const cubeWidth = calculatedCubeWidth > INITIAL_CUBE_SIZE ? INITIAL_CUBE_SIZE : calculatedCubeWidth;
      canvasRef.current.width = cubeWidth * res.columnLength;
      canvasRef.current.height = cubeWidth * res.rowLength;
      let color = FIRST_CUBE_COLOR;
      for (let i = 0; i < res.rowLength; i++) {
        color = (i + 1) % 2 === 0 ? CUBE_LIGHT_COLOR : CUBE_DARK_COLOR;
        for (let j = 0; j < res.columnLength; j++) {
          drawRect(ctx, j * cubeWidth, i * cubeWidth, cubeWidth, cubeWidth, res.formattedData[i + 1][j].isSelected ? color : 'red');
          color = color === CUBE_DARK_COLOR ? CUBE_LIGHT_COLOR : CUBE_DARK_COLOR;
        }
      }
    }
  }, [selectedCubesId, ctx]);

  // set canvas context in local state
  useEffect(() => {
    if (canvasRef.current) { setCtx(canvasRef.current.getContext('2d')); }
  }, []);
  return (
    <canvas ref={canvasRef} style={{ imageRendering: 'pixelated' }} />
  );
};

export default DrawGridWithCubesId;

const drawRect = (
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  color: string,
) => {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, w, h);
};

const generateFormattedData = (cubesIds: number[]) => {
  const ids = cubesIds.sort((a, b) => a - b);
  let minColumn = 0;
  let maxColumn = 0;
  let columnLength = 0;
  const formattedData: {
      [row: string]: {
          cubeId: number,
          row: number,
          column: number,
          isSelected: boolean
      }[]
  } = {};
  // group cube id by row
  ids.forEach((el, i) => {
    const row = Math.ceil(el / CUBES_TOTAL_ROWS);
    const column = Math.ceil(el % CUBES_TOTAL_ROWS);
    if (i === 0) {
      minColumn = column;
      maxColumn = column;
    } else if (column > maxColumn) {
      maxColumn = column;
    } else if (column < minColumn) {
      minColumn = column;
    }
    if (formattedData[row]) {
      formattedData[row] = [...formattedData[row], {
        cubeId: el,
        row,
        column,
        isSelected: true,
      }];
    } else {
      formattedData[row] = [{
        cubeId: el,
        row,
        column,
        isSelected: true,
      }];
    }
  });
  columnLength = maxColumn - minColumn + 1;
  const keys = Object.keys(formattedData);
  keys.forEach((el) => {
    formattedData[el] = new Array(columnLength).fill(0).map((_, i) => {
      const cubeId = (Number(el) - 1) * CUBES_TOTAL_ROWS + i + minColumn;
      const cube = formattedData[el].find((x) => Number(x.cubeId) === cubeId);
      if (cube) {
        return cube;
      }
      return {
        cubeId,
        row: Math.ceil(cubeId / CUBES_TOTAL_ROWS),
        column: Math.ceil(cubeId % CUBES_TOTAL_ROWS),
        isSelected: false,
      };
    });
  });
  return {
    formattedData,
    columnLength,
    rowLength: Object.keys(formattedData).length,
    minColumn,
    maxColumn,
  };
};
