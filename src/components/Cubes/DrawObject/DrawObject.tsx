import { RefObject, useEffect, useRef } from 'react';

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
    >
      <image
        ref={imageRef}
        clipPath="url(#myClip)"
        preserveAspectRatio="none"
        href={image.base64}
      />
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
      imageRef.current?.setAttribute('width', (parentWidth - 2).toString());
      imageRef.current?.setAttribute('height', (parentHeight - 1.8).toString());
      imageRef.current?.setAttribute('x', (parentX + (1)).toString());
      imageRef.current?.setAttribute('y', (parentY + (1)).toString());
    }
  }
};

interface PropsTypes {
    image: {
        base64: string,
        id: string
    }
}
