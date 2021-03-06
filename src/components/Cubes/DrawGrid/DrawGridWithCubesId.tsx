import {
  Dispatch,
  SetStateAction,
  useCallback, useEffect, useRef, useState,
} from 'react';
import {
  Layer, Rect, Stage,
} from 'react-konva';
import { useAppDispatch, useSelector } from '../../../hooks/useSelector';
import { CUBES_TOTAL_ROWS } from '../../../Routes/Cubes/Cubes';
import { TextType } from '../../../Routes/Cubes/CubesCart/CubesCart';
import { setSelectedCubesInfo } from '../../../store/ducks/cubesDuck';
import ImageWrapper from './Image';
import TextWrapper from './Text';

const DrawGridWithCubesId = ({
  scale, setScale, texts, setSelectedObjectId, selectedObjectId, images, selectedColor, selectedTab,
}: PropsTypes) => {
  let color = '#1A3044';
  const dispatch = useAppDispatch();
  const timerRef = useRef<any>();
  const squareInitialPrice = useSelector((state) => state.cubesReducer.initialData?.squarePrice) || 0;
  const [stageCords, setStageCords] = useState({
    x: 0,
    y: 0,
  });
  const [canvasProps, setCanvasProps] = useState<{w:number, h:number, cubeSize: number} | null>(null);
  const [showClipPath, setClipPath] = useState(true);
  const [data, setData] = useState<ReturnType<typeof generateFormattedData> | null>(null);
  const [cubesColor, setCubesColor] = useState<{[key:string]: string}>({});
  const selectedCubesIds = useSelector((state) => state.cubesReducer.selectedCubesInfo?.cubesId);
  const canvasWrapperRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<any>(null);
  const stageRefCopy = useRef<any>(null);

  const clipFunc = useCallback((ctx: any) => {
    if (data && canvasProps && showClipPath) {
      let x = 0;
      let y = 0;
      Object.keys(data.data).forEach((el) => {
        data.data[el].forEach((item) => {
          if (item.isSelected) {
            ctx.rect(x, y, canvasProps.cubeSize, canvasProps.cubeSize);
          }
          x += canvasProps.cubeSize;
        });
        x = 0;
        y = Number(el) * canvasProps.cubeSize;
      });
      // setSelectedObjectId(null);
    }
  }, [data, canvasProps, showClipPath]);

  const calculateCubeSize = () => {
    if (canvasWrapperRef.current && canvasWrapperRef.current?.parentElement && data) {
      const props = canvasWrapperRef.current.parentElement.getBoundingClientRect();
      const canvasMinSize = props.width < props.height ? props.width : props.height;
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
        x: (props.width - (cubeSize * data.columnLength)) / 2,
        y: (props.height - (cubeSize * data.rowLength)) / 2,
      });
      setCanvasProps({
        w: props.width,
        h: props.height,
        cubeSize,
      });
    }
  };

  const handleZoom = (e: any) => {
    e.evt.preventDefault();
    const scaleBy = 1.02;
    const stage = e.target.getStage();
    const oldScale = stage.scaleX();
    const mousePointTo = {
      x: stage.getPointerPosition().x / oldScale - stage.x() / oldScale,
      y: stage.getPointerPosition().y / oldScale - stage.y() / oldScale,
    };
    const newScale = e.evt.deltaY < 0 ? oldScale * scaleBy : oldScale / scaleBy;
    setStageCords({
      x: (stage.getPointerPosition().x / newScale - mousePointTo.x) * newScale,
      y: (stage.getPointerPosition().y / newScale - mousePointTo.y) * newScale,
    });
    setScale(newScale);
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

  // set initial cubes price

  useEffect(() => {
    if (data && selectedCubesIds) {
      dispatch(setSelectedCubesInfo({ key: 'totalPrice', value: squareInitialPrice * selectedCubesIds.length }));
    }
  }, [data, selectedCubesIds]);

  // set base 64 in store

  const generateImgRes = () => {
    stageRefCopy.current = stageRef.current.clone();
    const x = stageRefCopy.current.getX();
    const y = stageRefCopy.current.getY();
    const cubeSize = calculateCubeSize();
    const length = data?.columnLength;
    const height = data?.rowLength;
    stageRefCopy.current.scale({ x: 1, y: 1 });
    if (typeof x === 'number' && typeof y === 'number' && stageRef.current && typeof length === 'number' && typeof height === 'number') {
      return stageRefCopy.current.toDataURL({
        x, y, width: cubeSize * length, height: cubeSize * height, scale: 1,
      });
    }
    return undefined;
  };

  useEffect(() => {
    if (selectedTab !== 2) {
      timerRef.current = setInterval(() => {
        const res = generateImgRes();
        if (res) {
          dispatch(setSelectedCubesInfo({
            key: 'base64',
            value: res,
          }));
        }
      }, 500);
    } else {
      clearInterval(timerRef.current);
    }
    return () => {
      clearInterval(timerRef.current);
    };
  }, [data, selectedTab]);

  return (
    <div ref={canvasWrapperRef}>
      {canvasProps && (
      <Stage
        draggable
        ref={stageRef}
        onWheel={handleZoom}
        width={canvasProps.w}
        height={canvasProps.h}
        scaleX={scale || 1}
        scaleY={scale || 1}
        x={stageCords.x}
        y={stageCords.y}
        onMouseOver={() => {
          setClipPath(false);
        }}
        onMouseLeave={() => {
          setClipPath(true);
        }}
      >
        <Layer>
          {data && Object.keys(data.data)
            .map((el, y) => {
              if (data.columnLength % 2 === 0) {
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
                      fill={item.isSelected ? cubesColor[item.cubeId] || color : 'transparent'}
                      onClick={() => selectedTab === 1
                         && setCubesColor({ ...cubesColor, [item.cubeId]: selectedColor })}
                    />
                  );
                });
            })}
        </Layer>
        <Layer clipFunc={showClipPath ? clipFunc : undefined}>
          {texts.map((text) => (
            <TextWrapper
              fontSize={50}
              key={text.val}
              fill={text.fill}
              text={text.val}
              x={0}
              y={0}
              id={text.id}
              selectedObjId={selectedObjectId}
              setSelectedObjId={setSelectedObjectId}
              fontFamily={text.fontFamily}
              fontStyle={text.fontStyle}
            />
          ))}
          {images.map((el) => (
            <ImageWrapper
              x={0}
              y={0}
              key={el.id}
              file={el}
              setSelectedObjId={setSelectedObjectId}
              selectedObjId={selectedObjectId}
            />
          ))}
        </Layer>
      </Stage>
      )}
    </div>
  );
};

export default DrawGridWithCubesId;

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
    columnLength: maxColumnLength,
    rowLength: Object.keys(data).length,
  };
};

interface TextProps extends TextType {
  id: string
}

interface PropsTypes {
  scale: number,
  setScale: Dispatch<SetStateAction<number>>,
  texts: TextProps[],
  setSelectedObjectId: Dispatch<SetStateAction<string | null>>
  selectedObjectId: string | null,
  images: {id:string, file?:File, base64?: string, value?: string}[],
  selectedColor: string,
  selectedTab: number
}
