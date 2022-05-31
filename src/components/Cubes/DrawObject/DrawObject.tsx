import {
  MouseEvent, RefObject, useCallback, useEffect, useRef, useState,
} from 'react';
import useObjectDrag from '../hooks/useObjectDrag';
import useObjectSizing from '../hooks/useObjectSizing';
import Tools from './Tools';

const DrawObject = ({ image, isSelected, setSelectedObjectId }: PropsTypes) => {
  const [isDragging, setDragging] = useState(false);
  const [isSizing, setSizing] = useState(false);
  const rootRef = useRef<SVGGElement>(null);
  const imageRef = useRef<SVGImageElement>(null);
  const toolsRef = useRef<SVGGElement>(null);
  const { getDragCurrentMousePos, setDragInitialParams } = useObjectDrag(rootRef);
  const { onSizingStart, resize } = useObjectSizing(rootRef);

  const handleDrag = (e:MouseEvent) => {
    const mousePos = getDragCurrentMousePos(e);
    if (isDragging && rootRef.current && mousePos) {
      rootRef.current.setAttribute('x', mousePos.x.toString());
      rootRef.current.setAttribute('y', mousePos.y.toString());
      drawInitialWall(rootRef, imageRef, toolsRef);
    }
  };

  const handleSizingStart = (e: MouseEvent, resizeBtn: 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight') => {
    setSizing(true);
    onSizingStart(e, resizeBtn);
  };

  const handleSizeChange = useCallback((e:any) => {
    resize(e, () => drawInitialWall(rootRef, imageRef, toolsRef));
  }, []);

  const stopSizing = () => {
    setSizing(false);
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

  // listen mouse move and resize

  useEffect(() => {
    if (isSizing) {
      window.addEventListener('mousemove', handleSizeChange);
      window.addEventListener('mouseup', stopSizing);
    } else {
      window.removeEventListener('mousemove', handleSizeChange);
      window.removeEventListener('mouseup', stopSizing);
    }
    return () => {
      window.removeEventListener('mousemove', handleSizeChange);
      window.removeEventListener('mouseup', stopSizing);
    };
  }, [isSizing]);

  return (
    <g
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
          setDragging(true);
          const ev = e as MouseEvent;
          setDragInitialParams(ev);
        }}
        onMouseUp={() => {
          setDragging(false);
        }}
        onMouseLeave={() => {
          setDragging(false);
        }}
      />
      <Tools ref={toolsRef} onSizingStart={handleSizingStart} />
    </g>
  );
};

export default DrawObject;

const INITIAL_X = 2;
const INITIAL_Y = 2;
const INITIAL_WIDTH = 50;
const INITIAL_HEIGHT = 30;

const drawInitialWall = (
  rootRef: RefObject<SVGGElement>,
  imageRef: RefObject<SVGImageElement>,
  toolsRef: RefObject<SVGGElement>,
) => {
  const rootEl = rootRef.current;
  if (rootEl) {
    const parentX = Number(rootRef.current.getAttribute('x'));
    const parentY = Number(rootRef.current.getAttribute('y'));
    const parentWidth = Number(rootEl.getAttribute('width'));
    const parentHeight = Number(rootEl.getAttribute('height'));
    if (imageRef.current) {
      imageRef.current?.setAttribute('width', (parentWidth).toString());
      imageRef.current?.setAttribute('height', (parentHeight).toString());
      imageRef.current?.setAttribute('x', (parentX).toString());
      imageRef.current?.setAttribute('y', (parentY).toString());
    }

    // draw tools
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
    setSelectedObjectId: (val:string) => void
}
