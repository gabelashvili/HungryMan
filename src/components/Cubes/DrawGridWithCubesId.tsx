import {
  Dispatch,
  MouseEvent, RefObject, SetStateAction, useEffect, useRef, useState,
} from 'react';
import { useSelector } from '../../hooks/useSelector';
import {
  CUBES_TOTAL_ROWS, CUBE_DARK_COLOR, CUBE_LIGHT_COLOR, FIRST_CUBE_COLOR, INITIAL_CUBE_SIZE,
} from '../../Routes/Cubes/Cubes';

let color = FIRST_CUBE_COLOR;
const ZOOM_STEP = 0.05;

const DrawGridWithCubesId = ({ setZoom }: {setZoom: Dispatch<SetStateAction<number>>}) => {
  const [formattedData, setFormattedData] = useState<FormattedDataType | null>(null);
  const selectedCubesId = useSelector((state) => state.cubesReducer.selectedCubes);
  const svgRef = useRef<SVGSVGElement>(null);
  useEffect(() => {
    if (selectedCubesId.length > 0) {
      const res = generateFormattedData(selectedCubesId);
      setFormattedData(res);
    }
  }, [selectedCubesId]);

  // set svg viewbox, width and height
  useEffect(() => {
    if (svgRef.current?.parentElement && formattedData) {
      const svgProps = svgRef.current.parentElement.getBoundingClientRect();
      const width = Math.floor(svgProps.width);
      const height = Math.floor(svgProps.height);
      svgRef.current.setAttribute('viewBox', `0 0 ${formattedData.columnLength * INITIAL_CUBE_SIZE} ${formattedData.rowLength * INITIAL_CUBE_SIZE}`);
      svgRef.current.setAttribute('width', (width).toString());
      svgRef.current.setAttribute('height', (height).toString());
    }
  }, [formattedData]);

  return (
    <svg
      ref={svgRef}
      transform="matrix(1 0 0 1 0 0)"
      preserveAspectRatio="xMidYMid meet"
      onWheel={(e) => {
        zoom(e.deltaY < 0 ? 'in' : 'out', svgRef, setZoom);
      }}
    >
      <g>
        {formattedData && Object.keys(formattedData.data)
          .map((el, y) => {
            color = (y + 1) % 2 === 0 ? CUBE_LIGHT_COLOR : CUBE_DARK_COLOR;
            return formattedData.data[el]
              .map((item, x) => {
                color = color === CUBE_DARK_COLOR ? CUBE_LIGHT_COLOR : CUBE_DARK_COLOR;
                return drawRect(
                  x * INITIAL_CUBE_SIZE,
                  y * INITIAL_CUBE_SIZE,
                  INITIAL_CUBE_SIZE,
                  INITIAL_CUBE_SIZE,
                  item.cubeId,
                  (e) => console.log(e),
                  color,
                  formattedData.data[el][x].isSelected,
                );
              });
          })}
      </g>
    </svg>

  );
};

export default DrawGridWithCubesId;

const drawRect = (
  x: number,
  y: number,
  w: number,
  h: number,
  id: number,
  handleClick: (e: MouseEvent<SVGRectElement>) => void,
  color: string,
  isSelected: boolean,
) => (
  <rect
    width={w}
    height={h}
    x={x}
    y={y}
    key={id}
    style={{ fill: !isSelected ? 'red' : color }}
    id={id.toString()}
    onClick={(e) => handleClick(e)}
  />
);

const generateFormattedData = (cubesIds: number[]) => {
  const ids = cubesIds.sort((a, b) => a - b);
  let minRow = Math.ceil(ids[0] / CUBES_TOTAL_ROWS);
  let rowDiff = minRow - 1;
  let minColumn = ids[0] % CUBES_TOTAL_ROWS;
  let maxColumnLength = 0;
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
    if (data[row - rowDiff].length > maxColumnLength) {
      maxColumnLength = data[row - rowDiff].length;
    }
  });
  const keys = Object.keys(data);
  keys.forEach((key) => {
    const firstCubeId = (data[key][0].row - 1) * CUBES_TOTAL_ROWS + minColumn;
    data[key] = new Array(maxColumnLength).fill(0).map((_, index) => {
      const currentCubeId = firstCubeId + index + 1;
      const cube = data[key].find((x) => x.cubeId === currentCubeId);
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
    columnLength: maxColumnLength,
    rowLength: Object.keys(data).length,
  };
};

const zoom = (
  zoomType: 'in' | 'out',
  svgRef:RefObject<SVGSVGElement>,
  setZoom: Dispatch<SetStateAction<number>>,
) => {
  if (svgRef.current) {
    const matrix = getComputedStyle(svgRef.current).transform.split('matrix')[1].slice(1, -1).split(',').map((x) => Number(x));
    if (zoomType === 'in') {
      matrix[0] += ZOOM_STEP;
      matrix[3] += ZOOM_STEP;
    } else {
      matrix[0] -= ZOOM_STEP;
      matrix[3] -= ZOOM_STEP;
    }
    const zoomPercent = Math.round((matrix[0] * 100 + Number.EPSILON) * 100) / 100;
    if (zoomPercent < 155 && zoomPercent > 45) {
      svgRef.current.setAttribute('transform', `matrix (${matrix.join(' ')})`);
      setZoom(Math.round((matrix[0] * 100 + Number.EPSILON) * 100) / 100);
    }
  }
};
interface FormattedDataType {
  data: {
    [key: string]: {
        cubeId: number;
        row: number;
        column: number;
        isSelected: boolean;
    }[];
};
columnLength: number;
rowLength: number;
}
