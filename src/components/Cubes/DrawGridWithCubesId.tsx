import {
  Dispatch,
  MouseEvent, RefObject, SetStateAction, useEffect, useRef, useState,
} from 'react';
import { useSelector } from '../../hooks/useSelector';
import {
  CUBES_TOTAL_ROWS, INITIAL_CUBE_SIZE,
} from '../../Routes/Cubes/Cubes';
import { ZOOM_STEP } from '../../Routes/Cubes/CubesCart/CubesCart';
import useObjectDrag from './hooks/useObjectDrag';
import UserSelectedObject from './UserSelectedObject';

let color = '#1A3044';

const DrawGridWithCubesId = ({ setZoom, setZoomActions, image }: PropsTypes) => {
  const [formattedData, setFormattedData] = useState<FormattedDataType | null>(null);
  const selectedCubesId = useSelector((state) => state.cubesReducer.selectedCubes);
  const svgRef = useRef<SVGSVGElement>(null);
  const svgGRef = useRef<SVGGElement>(null);
  const isZooming = useRef<boolean>(false);
  const isDragging = useRef<boolean>(false);
  const isSpaceClicked = useRef<boolean>(false);
  const { getDragCurrentMousePos, setDragInitialParams } = useObjectDrag(svgRef);

  const handleDragStart = (e:MouseEvent) => {
    isDragging.current = true;
    const x = svgRef.current?.getAttribute('x');
    const y = svgRef.current?.getAttribute('y');
    setDragInitialParams(e, Number(x), Number(y));
  };

  const handleDrag = (e:MouseEvent) => {
    const cords = getDragCurrentMousePos(e);
    if (isDragging.current && svgRef.current && cords && isSpaceClicked.current) {
      const matrix = getComputedStyle(svgRef.current).transform.split('matrix')[1].slice(1, -1).split(',').map((x) => Number(x));
      matrix[4] += cords.x;
      matrix[5] += cords.y;
      svgRef.current.setAttribute('transform', `matrix (${matrix.join(' ')})`);
    }
  };

  const handleSpaceDown = (e:KeyboardEvent) => {
    if (e.key === ' ') {
      e.preventDefault();
      e.stopPropagation();
      isSpaceClicked.current = true;
    }
  };

  const handleSpaceUp = (e:KeyboardEvent) => {
    if (e.key === ' ') {
      isSpaceClicked.current = false;
    }
  };

  // generate data based on selected cubes id
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
      svgRef.current.setAttribute('viewBox', `0 0 ${formattedData.columnLength * INITIAL_CUBE_SIZE + 15} ${formattedData.rowLength * INITIAL_CUBE_SIZE}`);
      svgRef.current.setAttribute('width', (width).toString());
      svgRef.current.setAttribute('height', (height).toString());
    }
  }, [formattedData]);

  // set zoom function in parent state
  useEffect(() => {
    if (svgRef.current) {
      setZoomActions({
        in: () => zoom('in', svgRef, setZoom),
        out: () => zoom('out', svgRef, setZoom),
      });
    }
  }, [svgRef]);

  // disable scroll when zooming
  useEffect(() => {
    document.addEventListener('wheel', (e) => preventScroll(e, isZooming.current), { passive: false });
    return () => {
      document.removeEventListener('wheel', preventScroll);
    };
  }, []);

  // handle space down and up

  useEffect(() => {
    document.addEventListener('keydown', handleSpaceDown);
    document.addEventListener('keyup', handleSpaceUp);
    return () => {
      document.removeEventListener('keydown', handleSpaceDown);
      document.removeEventListener('keyup', handleSpaceUp);
    };
  }, []);

  return (
    <svg
      style={{ width: '100%' }}
      id="root-svg"
      ref={svgRef}
      onMouseMove={handleDrag}
      onMouseDown={handleDragStart}
      onMouseUp={() => {
        isDragging.current = false;
      }}
      onMouseEnter={() => {
        isZooming.current = true;
      }}
      onMouseLeave={() => {
        isZooming.current = false;
        isDragging.current = false;
      }}
      transform="matrix(1 0 0 1 0 0)"
      preserveAspectRatio="xMidYMid meet"
      onWheel={(e) => {
        zoom(e.deltaY < 0 ? 'in' : 'out', svgRef, setZoom);
      }}
    >
      <g>
        <clipPath id="myClip">
          {formattedData && Object.keys(formattedData.data)
            .map((el, y) => {
              return formattedData.data[el]
                .map((item, x) => {
                  return item.isSelected && drawRect(
                    x * INITIAL_CUBE_SIZE,
                    y * INITIAL_CUBE_SIZE,
                    INITIAL_CUBE_SIZE,
                    INITIAL_CUBE_SIZE,
                    item.cubeId,
                    () => undefined,
                    'transparent',
                    formattedData.data[el][x].isSelected,
                  );
                });
            })}
        </clipPath>
      </g>
      <g
        ref={svgGRef}
      >
        {formattedData && Object.keys(formattedData.data)
          .map((el, y) => {
            color = (y + 1) % 2 === 0 ? '#1A3044' : '#132636';
            return formattedData.data[el]
              .map((item, x) => {
                color = color === '#132636' ? '#1A3044' : '#132636';
                return drawRect(
                  x * INITIAL_CUBE_SIZE,
                  y * INITIAL_CUBE_SIZE,
                  INITIAL_CUBE_SIZE,
                  INITIAL_CUBE_SIZE,
                  item.cubeId,
                  () => undefined,
                  color,
                  formattedData.data[el][x].isSelected,
                );
              });
          })}
      </g>
      {image && (
      <UserSelectedObject
        image={image}
      />
      )}
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
    style={{ fill: !isSelected ? 'transparent' : color }}
    id={id.toString()}
    onClick={(e) => handleClick(e)}
    data-selectable={isSelected ? 'true' : 'false'}
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
      const currentCubeId = firstCubeId + index;
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

interface PropsTypes {
  setZoom: Dispatch<SetStateAction<number>>,
  setZoomActions: Dispatch<SetStateAction<{
    in: () => void,
    out: () => void
  } | null>>,
  image?: File | null
}

const preventScroll = (e: WheelEvent, isZooming?: boolean) => {
  if (isZooming) {
    e.preventDefault();
    e.stopPropagation();
  }
  return false;
};
