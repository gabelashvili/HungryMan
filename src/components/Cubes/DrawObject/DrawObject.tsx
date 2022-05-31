import {
  Dispatch, MouseEvent, RefObject, SetStateAction, useEffect, useRef,
} from 'react';
import useObjectDrag from '../hooks/useObjectDrag';
import Tools from './Tools';

const DrawObject = ({ image, isSelected, setSelectedObjectId }: PropsTypes) => {
  const rootRef = useRef<SVGGElement>(null);
  const imageRef = useRef<SVGImageElement>(null);
  const isDragging = useRef<boolean>(false);
  const { getDragCurrentMousePos, setDragInitialParams } = useObjectDrag(rootRef);

  const handleDrag = (e:MouseEvent) => {
    if (isDragging.current && rootRef.current) {
      const matrix = getComputedStyle(rootRef.current).transform.split('matrix')[1].slice(1, -1).split(',').map((x) => Number(x));
      const mousePos = getDragCurrentMousePos(e);
      console.log(mousePos);
      matrix[4] += mousePos?.x || 1;
      matrix[5] += mousePos?.y || 1;
      rootRef.current.setAttribute('transform', `matrix (${matrix.join(' ')})`);
    }
  };

  // set initial params
  useEffect(() => {
    if (rootRef.current) {
      drawInitialWall(rootRef, imageRef);
    }
  }, []);

  // show toolbar

  return (
    <g
      transform="matrix(1 0 0 1 50 0)"
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
      <Tools />
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
    const topRight = document.getElementById('top-right');
    const topLeft = document.getElementById('top-left');
    const rotateBtn = document.getElementById('rotation');
    const bottomLeft = document.getElementById('bottom-left');
    const bottomRight = document.getElementById('bottom-right');
    if (topRight && topLeft && bottomRight && rotateBtn && bottomLeft && bottomRight) {
      // set top
      topLeft.setAttribute('cx', (Number(parentX)).toString());
      topLeft.setAttribute('cy', parentY.toString());
      topRight.setAttribute('cx', (parentX + parentWidth).toString());
      topRight.setAttribute('cy', (parentY).toString());
      // set bottom
      bottomLeft.setAttribute('cx', (Number(parentX)).toString());
      bottomLeft.setAttribute('cy', (parentY + parentHeight).toString());
      bottomRight.setAttribute('cx', (Number(parentX) + parentWidth).toString());
      bottomRight.setAttribute('cy', (parentY + parentHeight).toString());
      // set rotate btn
      rotateBtn.setAttribute('cx', (Number(parentX + parentWidth / 2)).toString());
      rotateBtn.setAttribute('cy', (parentY).toString());
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
