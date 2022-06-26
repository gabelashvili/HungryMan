import {
  useEffect, useRef, useState,
} from 'react';
import {
  Layer, Rect, Stage,
} from 'react-konva';
import { useSelector } from '../../../hooks/useSelector';
import { CUBES_TOTAL_ROWS } from '../../../Routes/Cubes/Cubes';

const DrawInitialGrid = () => {
  let color = '#1A3044';
  const [stageCords, setStageCords] = useState({
    x: 0,
    y: 0,
  });
  const selectedCubesIds = useSelector((state) => state.cubesReducer.selectedCubesInfo.cubesId);
  const [canvasProps, setCanvasProps] = useState<{w:number, h:number, cubeSize: number} | null>(null);
  const [data, setData] = useState<ReturnType<typeof generateFormattedData> | null>(null);
  const canvasWrapperRef = useRef<HTMLDivElement>(null);

  const calculateCubeSize = () => {
    if (canvasWrapperRef.current && canvasWrapperRef.current?.parentElement && data) {
      const props = canvasWrapperRef.current.parentElement.getBoundingClientRect();
      const canvasMinSize = props.height;
      const dataMax = data.columnLength > data.rowLength ? data.columnLength : data.rowLength;
      const cubeSize = canvasMinSize / dataMax;
      return cubeSize;
    }
    return 1;
  };

  const calculateCanvasProps = () => {
    if (canvasWrapperRef.current && canvasWrapperRef.current?.parentElement && data) {
      const props = canvasWrapperRef.current.parentElement.getBoundingClientRect();
      const cubeSize = calculateCubeSize();
      setStageCords({
        ...stageCords,
        x: (props.width - (cubeSize * data.rowLength)) / 2,
        y: (props.height - (cubeSize * data.columnLength)) / 2,
      });
      setCanvasProps({
        w: props.width,
        h: cubeSize * data.columnLength,
        cubeSize,
      });
    }
  };

  // set formatted data
  useEffect(() => {
    if (selectedCubesIds) {
      const res = generateFormattedData(selectedCubesIds);
      setData(res);
    }
  }, [selectedCubesIds]);

  // set canvas initial width and height
  useEffect(() => {
    if (canvasWrapperRef.current && canvasWrapperRef.current?.parentElement && data) {
      calculateCanvasProps();
    }
  }, [data]);

  // handle window resize and set new props
  useEffect(() => {
    window.addEventListener('resize', calculateCanvasProps);
    return () => window.removeEventListener('resize', calculateCanvasProps);
  }, []);

  return (
    <div ref={canvasWrapperRef}>
      {canvasProps && (
        <Stage
          width={canvasProps.w}
          height={canvasProps.h}
          scaleX={1}
          scaleY={1}
          x={stageCords.x}
          y={stageCords.y}
        >
          <Layer>
            {data && Object.keys(data.data)
              .map((el, y) => {
                if (data.rowLength % 2 === 0) {
                  color = color === '#132636' ? '#1A3044' : '#132636';
                }
                return data.data[el]
                  .map((item, x) => {
                    color = color === '#132636' ? '#1A3044' : '#132636';
                    return (
                      <Rect
                        key={item.cubeId}
                        x={x * canvasProps.cubeSize}
                        y={y * canvasProps.cubeSize}
                        width={canvasProps.cubeSize}
                        height={canvasProps.cubeSize}
                        fill={item.isSelected ? color : 'transparent'}
                      />
                    );
                  });
              })}
          </Layer>
        </Stage>
      )}
    </div>
  );
};

export default DrawInitialGrid;

const generateFormattedData = (cubesIds: number[]) => {
  const ids = cubesIds.sort((a, b) => a - b);
  let minRow = Math.ceil(ids[0] / CUBES_TOTAL_ROWS);
  let rowDiff = minRow - 1;
  let minColumn = ids[0] % CUBES_TOTAL_ROWS;
  let maxRowLength = 0;
  const data: {[key: string]: {
      cubeId: number,
      row: number,
      column: number,
      isSelected: boolean
    }[]} = {};

  ids.forEach((el) => {
    const row = Math.ceil(el / CUBES_TOTAL_ROWS);
    if (row < minRow) {
      minRow = row;
      rowDiff = row - 1;
    }
    const column = el % CUBES_TOTAL_ROWS;
    if (column < minColumn) {
      minColumn = column;
    }
    if (data[row - rowDiff]) {
      data[row - rowDiff].push({
        cubeId: el,
        row,
        column,
        isSelected: true,
      });
    } else {
      data[row - rowDiff] = [{
        cubeId: el,
        row,
        column,
        isSelected: true,
      }];
    }
    if (data[row - rowDiff].length > maxRowLength) {
      maxRowLength = data[row - rowDiff].length;
    }
  });
  const keys = Object.keys(data);
  keys.forEach((key) => {
    const firstCubeId = (data[key][0].row - 1) * CUBES_TOTAL_ROWS + minColumn;
    data[key] = new Array(maxRowLength).fill(0).map((_, index) => {
      const currentCubeId: number = firstCubeId + index;
      const cube: any = data[key].find((x) => x.cubeId === currentCubeId);
      if (cube) {
        return cube;
      }
      return {
        cubeId: currentCubeId,
        row: Math.ceil(currentCubeId / CUBES_TOTAL_ROWS),
        column: currentCubeId % CUBES_TOTAL_ROWS,
        isSelected: false,
      };
    });
  });
  return {
    data,
    rowLength: maxRowLength,
    columnLength: Object.keys(data).length,
  };
};
