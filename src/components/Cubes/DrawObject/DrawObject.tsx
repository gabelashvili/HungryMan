import { RefObject, useEffect, useRef } from 'react';
import Tools from './Tools';

const DrawObject = ({ image }: PropsTypes) => {
  const rootRef = useRef<SVGGElement>(null);
  const imageRef = useRef<SVGImageElement>(null);

  useEffect(() => {
    if (rootRef.current) {
      redrawChildren(rootRef, imageRef);
    }
  }, []);
  return (
    <g
      x={INITIAL_X}
      y={INITIAL_Y}
      width={INITIAL_WIDTH}
      height={INITIAL_HEIGHT}
      ref={rootRef}
      id={image.id}
      style={{ cursor: 'pointer' }}
    >
      <image
        ref={imageRef}
        clipPath="url(#myClip)"
        preserveAspectRatio="none"
        href={image.base64}
      />
      <Tools />
    </g>
  );
};

export default DrawObject;

const INITIAL_X = 2;
const INITIAL_Y = 2;
const INITIAL_WIDTH = 50;
const INITIAL_HEIGHT = 30;

const redrawChildren = (
  rootRef: RefObject<SVGGElement>,
  imageRef: RefObject<SVGImageElement>,
) => {
  const rootEl = rootRef.current;
  if (rootEl) {
    const parentX = Number(rootEl.getAttribute('x'));
    const parentY = Number(rootEl.getAttribute('y'));
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
    }
}
