import React, {
  RefObject, useEffect, useRef, useState,
} from 'react';

const EDIT_CIRCLE_RADIUS = 2;
const INITIAL_X = 1;
const INITIAL_Y = 10;
const INITIAL_WIDTH = 50;
const INITIAL_HEIGHT = 30;
const UploadedImage = ({ uploadedFileUrl }: {uploadedFileUrl:string}) => {
  const [showTools, setShowTools] = useState<boolean>(false);
  const rootRef = useRef<SVGGElement>(null);
  const rectRef = useRef<SVGRectElement | null>(null);
  const topMiddle = useRef<SVGCircleElement | null>(null);
  const leftMiddle = useRef<SVGCircleElement | null>(null);
  const rightMiddle = useRef<SVGCircleElement | null>(null);
  const bottomMiddle = useRef<SVGCircleElement | null>(null);
  const imageRef = useRef<SVGImageElement>(null);

  useEffect(() => {
    if (rootRef.current) {
      drawImage(
        rootRef,
        rectRef,
        topMiddle,
        leftMiddle,
        rightMiddle,
        bottomMiddle,
        imageRef,
      );
    }
  }, [showTools]);

  const handleClickOutside = (e: any) => {
    if (!rootRef?.current?.contains(e.target)) {
      showTools && setShowTools(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <g
      x={INITIAL_X}
      y={INITIAL_Y}
      width={INITIAL_WIDTH}
      height={INITIAL_HEIGHT}
      ref={rootRef}
      onMouseDown={() => setShowTools(true)}
      preserveAspectRatio="none"
      style={{
        transformBox: 'fill-box',
        transformOrigin: 'center',
        transform: 'rotate(0deg)',
      }}
    >
      <image
        ref={imageRef}
        preserveAspectRatio="none"
        xlinkHref={uploadedFileUrl}
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
          r={EDIT_CIRCLE_RADIUS}
          fill="rgba(0, 168, 255, 1)"
          ref={topMiddle}
          style={{ cursor: 'pointer' }}
        />
        <circle
          r={EDIT_CIRCLE_RADIUS}
          fill="rgba(0, 168, 255, 1)"
          ref={leftMiddle}
          style={{ cursor: 'pointer' }}
        />
        <circle
          r={EDIT_CIRCLE_RADIUS}
          fill="rgba(0, 168, 255, 1)"
          ref={rightMiddle}
          style={{ cursor: 'pointer' }}
        />
        <circle
          r={EDIT_CIRCLE_RADIUS}
          fill="rgba(0, 168, 255, 1)"
          ref={bottomMiddle}
          style={{ cursor: 'pointer' }}
        />
      </>
      )}
    </g>
  );
};

export default UploadedImage;

const drawImage = (
  mainRef:any,
  rectRef: any,
  topMiddle: RefObject<SVGCircleElement | null>,
  leftMiddle:RefObject<SVGCircleElement | null>,
  rightMiddle: RefObject<SVGCircleElement | null>,
  bottomMiddle: RefObject<SVGCircleElement | null>,
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
    topMiddle.current?.setAttribute('cx', (Number(parentX) + parentWidth / 2).toString());
    topMiddle.current?.setAttribute('cy', parentY.toString());
    // set middle
    leftMiddle.current?.setAttribute('cx', parentX.toString());
    leftMiddle.current?.setAttribute('cy', (parentY + parentHeight / 2).toString());
    rightMiddle.current?.setAttribute('cx', (Number(parentX) + parentWidth).toString());
    rightMiddle.current?.setAttribute('cy', (parentY + parentHeight / 2).toString());
    // set bottom
    bottomMiddle.current?.setAttribute('cx', (Number(parentX) + parentWidth / 2).toString());
    bottomMiddle.current?.setAttribute('cy', (parentY + parentHeight).toString());
    // set image props
    imageRef.current?.setAttribute('width', (parentWidth - 2).toString());
    imageRef.current?.setAttribute('height', (parentHeight - 1.8).toString());
    imageRef.current?.setAttribute('x', (parentX + (1)).toString());
    imageRef.current?.setAttribute('y', (parentY + (1)).toString());
  }
};