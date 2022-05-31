import {
  Dispatch, MouseEvent, RefObject, SetStateAction, useEffect, useRef, useState,
} from 'react';
import useObjectDrag from '../hooks/useObjectDrag';
import Tools from './Tools';

const DrawObject = ({ image, isSelected, setSelectedObjectId }: PropsTypes) => {
  const [currentMatrix, setCurrentMatrix] = useState([1, 0, 0, 1, 2, 2]);
  const rootRef = useRef<SVGGElement>(null);
  const imageRef = useRef<SVGImageElement>(null);
  const isDragging = useRef<boolean>(false);
  const toolsRef = useRef<SVGGElement>(null);
  const { getDragCurrentMousePos, setDragInitialParams } = useObjectDrag(rootRef);

  const handleDrag = (e:MouseEvent) => {
    if (isDragging.current && rootRef.current) {
      const matrix = [...currentMatrix];
      const mousePos = getDragCurrentMousePos(e);
      matrix[4] += mousePos?.x || 1;
      matrix[5] += mousePos?.y || 1;
      setCurrentMatrix(matrix);
    }
  };

  // set initial params
  useEffect(() => {
    if (rootRef.current) {
      drawInitialWall(rootRef, imageRef, toolsRef);
    }
  }, []);

  useEffect(() => {
    if (toolsRef.current) {
      toolsRef.current.style.visibility = 'hidden';
      if (!isSelected) {
        toolsRef.current.style.visibility = 'hidden';
      } else {
        toolsRef.current.style.visibility = 'visible';
      }
    }
  }, [isSelected]);

  // show toolbar

  return (
    <g
      transform={`matrix(${currentMatrix.join(' ')})`}
      x={INITIAL_X}
      y={INITIAL_Y}
      width={INITIAL_WIDTH}
      height={INITIAL_HEIGHT}
      ref={rootRef}
      id={image.id}
      style={{ cursor: 'pointer' }}
      onMouseDown={() => {
        setSelectedObjectId(image.id);
      }}
    >
      <image
        ref={imageRef}
        clipPath="url(#myClip)"
        preserveAspectRatio="none"
        href={image.base64}
        onMouseMove={(e) => handleDrag(e)}
        onMouseDown={(e) => {
          isDragging.current = true;
          const ev = e as MouseEvent;
          setDragInitialParams(ev);
        }}
        onMouseUp={() => {
          isDragging.current = false;
        }}
        onMouseLeave={() => {
          isDragging.current = false;
        }}
      />
      <Tools ref={toolsRef} />
    </g>
  );
};

export default DrawObject;

const INITIAL_X = 0;
const INITIAL_Y = 0;
const INITIAL_WIDTH = 50;
const INITIAL_HEIGHT = 30;

const drawInitialWall = (
  rootRef: RefObject<SVGGElement>,
  imageRef: RefObject<SVGImageElement>,
  toolsRef: RefObject<SVGGElement>,
) => {
  const rootEl = rootRef.current;
  if (rootEl) {
    const matrix = getComputedStyle(rootRef.current).transform.split('matrix')[1].slice(1, -1).split(',').map((x) => Number(x));
    const parentX = matrix[4];
    const parentY = matrix[5];
    const parentWidth = Number(rootEl.getAttribute('width'));
    const parentHeight = Number(rootEl.getAttribute('height'));
    if (imageRef.current) {
      imageRef.current?.setAttribute('width', (parentWidth).toString());
      imageRef.current?.setAttribute('height', (parentHeight).toString());
      imageRef.current?.setAttribute('x', (parentX).toString());
      imageRef.current?.setAttribute('y', (parentY).toString());
    }
    if (toolsRef.current) {
      const { children } = toolsRef.current;
      // set top
      children[0].setAttribute('cx', (Number(parentX)).toString());
      children[0].setAttribute('cy', parentY.toString());
      children[2].setAttribute('cx', (parentX + parentWidth).toString());
      children[2].setAttribute('cy', (parentY).toString());
      // set bottom
      children[3].setAttribute('cx', (Number(parentX)).toString());
      children[3].setAttribute('cy', (parentY + parentHeight).toString());
      children[4].setAttribute('cx', (Number(parentX) + parentWidth).toString());
      children[4].setAttribute('cy', (parentY + parentHeight).toString());
      // set rotate btn
      children[1].setAttribute('cx', (Number(parentX + parentWidth / 2)).toString());
      children[1].setAttribute('cy', (parentY).toString());
    }
  }
};

interface PropsTypes {
    image: {
        base64: string,
        id: string
    },
    isSelected:boolean,
    setSelectedObjectId: Dispatch<SetStateAction<string>>
}
