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
import { useSelector } from '../../hooks/useSelector';
import Logo from '../../assets/images/Vector2.png';
import { SoldCubesDetail } from '../../types/cubes';

const Wall = ({
  setMethods, setZoomPercent, selectedCubes, setSelectedCubes,
}: PropsTypes) => {
  const [isSpaceClicked, setSpaceClicked] = useState(false);
  const soldCubesDetail = useSelector((state) => state.cubesReducer.soldCubesDetails);
  const [img, setImg] = useState<any>(null);
  const panRef = useRef<ReactZoomPanPinchRef>(null);
  const isSelecting = useRef(false);
  const [ctx, setCtx] = useState<CanvasRenderingContext2D | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  console.log(soldCubesDetail);

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
    const leftNeighbor = selectedCubes.includes(cubeId - 1) ? cubeId - 1 : -1;
    const rightNeighbor = selectedCubes.includes(cubeId + 1) ? cubeId + 1 : -1;
    const topNeighbor = selectedCubes.includes(cubeId - CUBES_TOTAL_ROWS) ? cubeId - CUBES_TOTAL_ROWS : -1;
    const bottomNeighbor = selectedCubes.includes(cubeId + CUBES_TOTAL_ROWS) ? cubeId + CUBES_TOTAL_ROWS : -1;
    setSelectedCubes(selectedCubes.filter((el) => el !== cubeId));
    console.log(canDeselect, leftNeighbor, rightNeighbor, topNeighbor, bottomNeighbor);
  };

  const isCubeSelectable = (cubeId:number) => {
    if (soldCubesDetail?.soldCubes.includes(cubeId)) {
      return false;
    }
    if (selectedCubes.length === 0) {
      return true;
    }
    if ((selectedCubes.includes(cubeId - 1)
      || selectedCubes.includes(cubeId + 1)
      || selectedCubes.includes(cubeId - CUBES_TOTAL_ROWS)
      || selectedCubes.includes(cubeId + CUBES_TOTAL_ROWS)) && !selectedCubes.includes(cubeId)) {
      return true;
    }
    return false;
  };

  const handleCubeSelect = (e:MouseEvent) => {
    const cubeId = getCubeId(e);
    if (isCubeSelectable(cubeId)) {
      setSelectedCubes([...selectedCubes, cubeId]);
    }
  };

  const handleMouseDown = (e: MouseEvent) => {
    const cubeId = getCubeId(e);
    if (isCubeSelectable(cubeId)) {
      setSelectedCubes([...selectedCubes, cubeId]);
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
      const cubeSize = 40;
      canvasRef.current.width = cubeSize * CUBES_TOTAL_ROWS;
      canvasRef.current.height = cubeSize * CUBES_TOTAL_COLUMNS;
      const context = canvasRef.current.getContext('2d');
      setCtx(context);
    }
  }, []);

  // draw and redraw cubes
  useEffect(() => {
    if (ctx && canvasRef.current && img && soldCubesDetail) {
      const cubeSize = Math.round(canvasRef.current.width / CUBES_TOTAL_ROWS);
      redrawWall(
        ctx,
        cubeSize,
        selectedCubes,
        img,
        soldCubesDetail,
      );
    }
  }, [ctx, selectedCubes, img, soldCubesDetail]);

  // save cubes id in store
  // useEffect(() => {
  //   dispatch(setSelectedCubes(cubes));
  // }, [cubes]);

  // get base64 from logo an save local state
  useEffect(() => {
    const img = new Image();
    img.onload = () => {
      setImg(img);
    };
    img.src = Logo;
  }, []);

  // handle space press
  const handleSpaceDown = (e:KeyboardEvent) => {
    e.key === ' ' && setSpaceClicked(true);
  };

  const handleSpaceUp = (e:KeyboardEvent) => {
    e.key === ' ' && setSpaceClicked(false);
  };

  useEffect(() => {
    window.addEventListener('keydown', handleSpaceDown);
    window.addEventListener('keyup', handleSpaceUp);
    return () => {
      window.removeEventListener('keydown', handleSpaceDown);
      window.removeEventListener('keyup', handleSpaceUp);
    };
  }, []);

  return (
    <div style={{
      width: '100%', display: 'flex', alignItems: 'center', marginBottom: '130px',
    }}
    >
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
            onMouseDown={isSpaceClicked ? undefined : handleMouseDown}
            onMouseUp={isSpaceClicked ? undefined : handleMouseUp}
            onMouseMove={isSpaceClicked ? undefined : handleMouseMove}
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

const generateColor = (isSold:boolean, isSelected:boolean, color: string) => {
  if (isSold) {
    return 'gray';
  }
  if (isSelected) {
    return 'red';
  }
  return color;
};

const redrawWall = (
  ctx: CanvasRenderingContext2D,
  cubeSize: number,
  selectedCubes: number[],
  logo: any,
  soldCubesDetail: SoldCubesDetail,
) => {
  let color = CUBE_DARK_COLOR;
  for (let i = 0; i < CUBES_TOTAL_COLUMNS; i++) {
    for (let j = 0; j < CUBES_TOTAL_ROWS; j++) {
      const x = j * cubeSize;
      const y = i * cubeSize;
      const cubeId = (i) * CUBES_TOTAL_ROWS + j + 1;
      const isSelected = selectedCubes.includes(cubeId);
      drawRect(
        ctx,
        x,
        y,
        cubeSize,
        cubeSize,
        generateColor(soldCubesDetail.soldCubes.includes(cubeId), isSelected, color),
      );
      color = color === CUBE_DARK_COLOR ? CUBE_LIGHT_COLOR : CUBE_DARK_COLOR;
    }
    color = color === CUBE_DARK_COLOR ? CUBE_LIGHT_COLOR : CUBE_DARK_COLOR;
  }
  // draw logo
  ctx.drawImage(
    logo,
    (cubeSize * CUBES_TOTAL_ROWS - cubeSize * 86) / 2,
    0,
    cubeSize * 86,
    cubeSize * CUBES_TOTAL_COLUMNS,
  );
  // draw images
  // TODO: fix quality
  const { images } = soldCubesDetail;
  for (let i = 0; i < images.length; i++) {
    const { bottomRightCube, htmlImg, topLeftCube } = images[i];
    const x = (topLeftCube.row - 1) * cubeSize;
    const y = (topLeftCube.column - 1) * cubeSize;
    const w = (bottomRightCube.row - topLeftCube.row + 1) * cubeSize;
    const h = (bottomRightCube.column - topLeftCube.column + 1) * cubeSize;
    ctx.drawImage(htmlImg, x, y, w, h);
    // console.log(x, y);
  }
  ctx.restore();
};

interface PropsTypes {
  setMethods: Dispatch<SetStateAction<{
    handleZoomIn: () => void
    handleZoomOut: () => void
  } | null>>,
  setZoomPercent: Dispatch<SetStateAction<number>>,
  selectedCubes: number[],
  setSelectedCubes: Dispatch<SetStateAction<number[]>>
}
