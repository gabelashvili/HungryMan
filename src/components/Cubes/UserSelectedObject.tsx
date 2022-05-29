import {
  MouseEvent,
  RefObject, useEffect, useRef, useState,
} from 'react';
import { getBase64 } from '../../helpers';
import useObjectDrag from './hooks/useObjectDrag';
import useObjectSizing from './hooks/useObjectSizing';

const EDIT_CIRCLE_RADIUS = 2;
const INITIAL_X = 1;
const INITIAL_Y = 10;
const INITIAL_WIDTH = 50;
const INITIAL_HEIGHT = 30;
const UserSelectedObject = ({ image }: {image:File}) => {
  const [showTools, setShowTools] = useState<boolean>(false);
  const rootRef = useRef<SVGGElement>(null);
  const rectRef = useRef<SVGRectElement | null>(null);
  const topLeft = useRef<SVGCircleElement | null>(null);
  const topRight = useRef<SVGCircleElement | null>(null);
  const bottomLeft = useRef<SVGCircleElement | null>(null);
  const bottomRight = useRef<SVGCircleElement | null>(null);
  const imageRef = useRef<SVGImageElement>(null);
  const isDragging = useRef<boolean>(false);
  const isSizing = useRef<boolean>(false);
  const { getDragCurrentMousePos, setDragInitialParams } = useObjectDrag();
  const { onSizingStart, resize } = useObjectSizing(rootRef);

  const handleMouseMove = (e: any) => {
    if (rootRef.current) {
      if (isDragging.current) {
        const mousePos = getDragCurrentMousePos(e, rootRef);
        rootRef.current.setAttribute('x', (mousePos?.x || 1).toString());
        rootRef.current.setAttribute('y', (mousePos?.y || 1).toString());
        drawObject(
          rootRef,
          rectRef,
          topLeft,
          topRight,
          bottomLeft,
          bottomRight,
          imageRef,
        );
      }
      if (isSizing.current) {
        resize(e, () => drawObject(
          rootRef,
          rectRef,
          topLeft,
          topRight,
          bottomLeft,
          bottomRight,
          imageRef,
        ));
      }
    }
  };

  const toggleTools = (e: any) => {
    const props = rootRef.current?.getBoundingClientRect();
    if (rootRef.current && props && e.clientX >= props.left && e.clientX <= props.left + props.width
      && e.clientY >= props.top && e.clientY <= props.top + props.height) {
      setShowTools(true);
    } else {
      showTools && setShowTools(false);
    }
  };

  const startDrag = (e: any) => {
    const props = imageRef.current?.getBoundingClientRect();
    if (rootRef.current
      && props
      && e.clientX - EDIT_CIRCLE_RADIUS * 4 >= props.left
      && e.clientX + EDIT_CIRCLE_RADIUS * 4 <= props.left + props.width
      && e.clientY - EDIT_CIRCLE_RADIUS * 4 >= props.top
      && e.clientY + EDIT_CIRCLE_RADIUS * 4 <= props.top + props.height) {
      const x = parseFloat(rootRef.current.getAttribute('x') as string);
      const y = parseFloat(rootRef.current.getAttribute('y') as string);
      isDragging.current = true;
      setDragInitialParams(e, rootRef, x, y);
    }
  };

  const startSizing = (e:MouseEvent) => {
    const target = e.target as Element;
    if (topLeft.current?.contains(target)) {
      isSizing.current = true;
      onSizingStart(e, 'topLeft');
    }
    if (topRight.current?.contains(target)) {
      isSizing.current = true;
      onSizingStart(e, 'topRight');
    }
    if (bottomLeft.current?.contains(target)) {
      isSizing.current = true;
      onSizingStart(e, 'bottomLeft');
    }
    if (bottomRight.current?.contains(target)) {
      isSizing.current = true;
      onSizingStart(e, 'bottomRight');
    }
  };

  const handleMouseDown = (e:any) => {
    toggleTools(e);
    startDrag(e);
    startSizing(e);
  };

  const handleMouseUp = () => {
    isDragging.current = false;
    isSizing.current = false;
  };

  // draw initial
  useEffect(() => {
    if (rootRef.current) {
      getBase64(image, (val) => {
        imageRef.current?.setAttribute('href', val.toString());
      });
      drawObject(
        rootRef,
        rectRef,
        topLeft,
        topRight,
        bottomLeft,
        bottomRight,
        imageRef,
      );
    }
  }, [showTools, image]);

  // add mosedown,mousemove,mouseup, event listener to svg and check if target is image
  useEffect(() => {
    if (rootRef.current) {
      rootRef.current?.parentElement?.addEventListener('mousedown', handleMouseDown);
      rootRef.current?.parentElement?.addEventListener('mousemove', handleMouseMove);
      rootRef.current?.parentElement?.addEventListener('mouseup', handleMouseUp);
    }
    if (!setShowTools) {
      return () => {
        rootRef.current?.parentElement?.removeEventListener('mousedown', handleMouseDown);
        rootRef.current?.parentElement?.removeEventListener('mousemove', handleMouseMove);
        rootRef.current?.parentElement?.removeEventListener('mouseup', handleMouseUp);
      };
    }
    return () => {
      rootRef.current?.parentElement?.removeEventListener('mousedown', handleMouseDown);
      rootRef.current?.parentElement?.removeEventListener('mousemove', handleMouseMove);
      rootRef.current?.parentElement?.removeEventListener('mouseup', handleMouseUp);
    };
  }, [showTools]);

  return (
    <g
      onMouseMove={handleMouseMove}
      x={INITIAL_X}
      y={INITIAL_Y}
      width={INITIAL_WIDTH}
      height={INITIAL_HEIGHT}
      ref={rootRef}
      preserveAspectRatio="none"
      style={{
        transformBox: 'fill-box',
        transformOrigin: 'center',
        transform: 'rotate(0deg)',
        cursor: showTools ? 'move' : 'pointer',
      }}
    >
      <image
        ref={imageRef}
        clipPath="url(#myClip)"
        preserveAspectRatio="none"
      />
      {showTools && (
      <>
        <rect
          strokeWidth="0.5"
          stroke="rgba(0, 168, 255, 0.5)"
          fill="none"
          ref={rectRef}
        />
        <circle
          style={{ cursor: 'nw-resize' }}
          r={EDIT_CIRCLE_RADIUS}
          fill="rgba(0, 168, 255, 1)"
          ref={topLeft}
          id="top-left"
        />
        <circle
          style={{ cursor: 'ne-resize' }}
          r={EDIT_CIRCLE_RADIUS}
          fill="rgba(0, 168, 255, 1)"
          ref={topRight}
          id="top-right"
        />
        <circle
          style={{ cursor: 'ne-resize' }}
          r={EDIT_CIRCLE_RADIUS}
          fill="rgba(0, 168, 255, 1)"
          ref={bottomLeft}
          id="bottom-left"
        />
        <circle
          style={{ cursor: 'nw-resize' }}
          r={EDIT_CIRCLE_RADIUS}
          fill="rgba(0, 168, 255, 1)"
          ref={bottomRight}
          id="bottom-right"
        />
      </>
      )}
    </g>
  );
};

export default UserSelectedObject;

const drawObject = (
  mainRef:any,
  rectRef: any,
  topLeft: RefObject<SVGCircleElement | null>,
  topRight:RefObject<SVGCircleElement | null>,
  bottomLeft: RefObject<SVGCircleElement | null>,
  bottomRight: RefObject<SVGCircleElement | null>,
  imageRef: RefObject<SVGImageElement | null>,
) => {
  if (mainRef.current) {
    const parentX = Number(mainRef.current.getAttribute('x'));
    const parentY = Number(mainRef.current.getAttribute('y'));
    const parentWidth = Number(mainRef.current.getAttribute('width'));
    const parentHeight = Number(mainRef.current.getAttribute('height'));
    // set rect props
    rectRef.current?.setAttribute('x', parentX.toString());
    rectRef.current?.setAttribute('y', parentY.toString());
    rectRef.current?.setAttribute('width', (parentWidth).toString());
    rectRef.current?.setAttribute('height', (parentHeight).toString());
    // set top
    topLeft.current?.setAttribute('cx', (Number(parentX)).toString());
    topLeft.current?.setAttribute('cy', parentY.toString());
    topRight.current?.setAttribute('cx', (parentX + parentWidth).toString());
    topRight.current?.setAttribute('cy', (parentY).toString());
    // set bottom
    bottomLeft.current?.setAttribute('cx', (Number(parentX)).toString());
    bottomLeft.current?.setAttribute('cy', (parentY + parentHeight).toString());
    bottomRight.current?.setAttribute('cx', (Number(parentX) + parentWidth).toString());
    bottomRight.current?.setAttribute('cy', (parentY + parentHeight).toString());
    // set image props
    imageRef.current?.setAttribute('width', (parentWidth - 2).toString());
    imageRef.current?.setAttribute('height', (parentHeight - 1.8).toString());
    imageRef.current?.setAttribute('x', (parentX + (1)).toString());
    imageRef.current?.setAttribute('y', (parentY + (1)).toString());
  }
};
