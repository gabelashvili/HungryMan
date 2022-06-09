import {
  Dispatch,
  MouseEvent,
  SetStateAction,
  useEffect, useRef, useState,
} from 'react';
import { TransformWrapper, TransformComponent, ReactZoomPanPinchRef } from '@kokarn/react-zoom-pan-pinch';
import {
  CUBES_TOTAL_COLUMNS, CUBES_TOTAL_ROWS, CUBE_DARK_COLOR, CUBE_LIGHT_COLOR,
} from '../../Routes/Cubes/Cubes';
import { useAppDispatch } from '../../hooks/useSelector';
import { setSelectedCubes } from '../../store/ducks/cubesDuck';
import Logo from '../../assets/images/Vector2.png';

const Wall = ({ setMethods, setZoomPercent }: PropsTypes) => {
  const [img, setImg] = useState<any>(null);
  const dispatch = useAppDispatch();
  const panRef = useRef<ReactZoomPanPinchRef>(null);
  const isSelecting = useRef(false);
  const [ctx, setCtx] = useState<CanvasRenderingContext2D | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [cubes, setCubes] = useState<number[]>([]);

  const getCubeId = (e:MouseEvent) => {
    if (canvasRef.current && panRef.current && panRef.current.instance.contentComponent && ctx) {
      const { clientX } = e;
      const { clientY } = e;
      const canvasProps = canvasRef.current.getBoundingClientRect();
      const cubeSize = canvasProps.width / CUBES_TOTAL_ROWS;
      const row = Math.ceil((clientX - canvasProps.left) / cubeSize);
      const column = Math.ceil((clientY - canvasProps.top) / cubeSize);
      const cubeId = (column - 1) * CUBES_TOTAL_ROWS + row;
      return cubeId;
    }
    return 0;
  };

  const deselectCube = (e: MouseEvent) => {
    const cubeId = getCubeId(e);
    const canDeselect = true;
    const leftNeighbor = cubes.includes(cubeId - 1) ? cubeId - 1 : -1;
    const rightNeighbor = cubes.includes(cubeId + 1) ? cubeId + 1 : -1;
    const topNeighbor = cubes.includes(cubeId - CUBES_TOTAL_ROWS) ? cubeId - CUBES_TOTAL_ROWS : -1;
    const bottomNeighbor = cubes.includes(cubeId + CUBES_TOTAL_ROWS) ? cubeId + CUBES_TOTAL_ROWS : -1;
    setCubes(cubes.filter((el) => el !== cubeId));
    console.log(canDeselect, leftNeighbor, rightNeighbor, topNeighbor, bottomNeighbor);
  };

  const isCubeSelectable = (cubeId:number) => {
    // TODO: if cube is purchased return false
    if (cubes.length === 0) {
      return true;
    }
    if ((cubes.includes(cubeId - 1)
      || cubes.includes(cubeId + 1)
      || cubes.includes(cubeId - CUBES_TOTAL_ROWS)
      || cubes.includes(cubeId + CUBES_TOTAL_ROWS)) && !cubes.includes(cubeId)) {
      return true;
    }
    return false;
  };

  const handleCubeSelect = (e:MouseEvent) => {
    const cubeId = getCubeId(e);
    if (isCubeSelectable(cubeId)) {
      setCubes([...cubes, cubeId]);
    }
  };

  const handleMouseDown = (e: MouseEvent) => {
    const cubeId = getCubeId(e);
    if (isCubeSelectable(cubeId)) {
      setCubes([...cubes, cubeId]);
      isSelecting.current = true;
    }
  };

  const handleMouseUp = (e: MouseEvent) => {
    if (isSelecting.current) {
      isSelecting.current = false;
    } else {
      deselectCube(e);
    }
  };

  const handleMouseMove = (e:MouseEvent) => {
    if (isSelecting.current) {
      handleCubeSelect(e);
    }
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
    if (ctx && canvasRef.current && img) {
      const cubeSize = Math.round(canvasRef.current.width / CUBES_TOTAL_ROWS);
      redrawWall(
        ctx,
        cubeSize,
        cubes,
        img,
      );
    }
  }, [ctx, cubes, img]);

  // save cubes id in store
  useEffect(() => {
    dispatch(setSelectedCubes(cubes));
  }, [cubes]);

  // get base64 from logo an save local state

  useEffect(() => {
    const img = new Image();
    img.onload = () => {
      setImg(img);
    };
    img.src = Logo;
  }, []);

  return (
    <div style={{ width: '100%' }}>
      <TransformWrapper
        panning={{
          activationKeys: [' '],
        }}
        maxScale={8}
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
        <TransformComponent contentStyle={{ width: '100%' }} wrapperStyle={{ width: '100%' }}>
          <canvas
            ref={canvasRef}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onMouseMove={handleMouseMove}
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
  cubeSize: number,
  selectedCubes: number[],
  img: any,
) => {
  let color = CUBE_DARK_COLOR;
  for (let i = 0; i < CUBES_TOTAL_COLUMNS; i++) {
    for (let j = 0; j < CUBES_TOTAL_ROWS; j++) {
      const x = j * cubeSize;
      const y = i * cubeSize;
      const cubeId = (i) * CUBES_TOTAL_ROWS + j + 1;
      const isSelected = selectedCubes.includes(cubeId);
      drawRect(ctx, x, y, cubeSize, cubeSize, isSelected ? 'red' : color);
      color = color === CUBE_DARK_COLOR ? CUBE_LIGHT_COLOR : CUBE_DARK_COLOR;
    }
    color = color === CUBE_DARK_COLOR ? CUBE_LIGHT_COLOR : CUBE_DARK_COLOR;
  }
  ctx.drawImage(
    img,
    (cubeSize * CUBES_TOTAL_ROWS - cubeSize * 86) / 2,
    0,
    cubeSize * 86,
    cubeSize * CUBES_TOTAL_COLUMNS,
  );
  ctx.restore();
};

interface PropsTypes {
  setMethods: Dispatch<SetStateAction<{
    handleZoomIn: () => void
    handleZoomOut: () => void
  } | null>>,
  setZoomPercent: Dispatch<SetStateAction<number>>
}
