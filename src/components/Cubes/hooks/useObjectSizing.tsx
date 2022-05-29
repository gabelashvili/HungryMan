import { MouseEvent, RefObject, useRef } from 'react';

const MINIMUM_SIZE = 5;
const useObjectSizing = (rootRef: RefObject<SVGGElement>) => {
  const sizingStartInitialParams = useRef({
    originalWidth: 0,
    originalHeight: 0,
    originalX: 0,
    originalY: 0,
    originalMouseX: 0,
    originalMouseY: 0,
    resizeBtn: 'topLeft',
  });

  const getMousePosition = (evt: MouseEvent) => {
    const CTM = rootRef?.current?.getScreenCTM();
    if (rootRef.current && CTM) {
      return {
        x: (evt.clientX - CTM.e) / CTM.a,
        y: (evt.clientY - CTM.f) / CTM.d,
      };
    }
    return {
      x: 1,
      y: 1,
    };
  };

  const onSizingStart = (e:MouseEvent, resizeBtn: 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight') => {
    if (rootRef.current) {
      const cords = getMousePosition(e);
      sizingStartInitialParams.current = {
        originalWidth: Number(rootRef.current.getAttribute('width')),
        originalHeight: Number(rootRef.current.getAttribute('height')),
        originalX: Number(rootRef.current.getAttribute('x')),
        originalY: Number(rootRef.current.getAttribute('y')),
        originalMouseX: cords.x,
        originalMouseY: cords.y,
        resizeBtn,
      };
    }
  };

  const resize = (e:any, callBack: () => void) => {
    if (sizingStartInitialParams.current.resizeBtn === 'topLeft') {
      const {
        originalHeight, originalWidth, originalMouseX, originalMouseY, originalX, originalY,
      } = sizingStartInitialParams.current;
      const { x: currentMouseX, y: currentMouseY } = getMousePosition(e);
      const width = originalWidth - (currentMouseX - originalMouseX);
      const height = originalHeight - (currentMouseY - originalMouseY);
      if (width > MINIMUM_SIZE) {
        rootRef.current?.setAttribute('width', width.toString());
        const newX = originalX + currentMouseX - originalMouseX;
        rootRef.current?.setAttribute('x', newX.toString());
      }
      if (height > MINIMUM_SIZE) {
        rootRef.current?.setAttribute('height', height.toString());
        const newY = originalY + currentMouseY - originalMouseY;
        rootRef.current?.setAttribute('y', newY.toString());
      }
    } else if (sizingStartInitialParams.current.resizeBtn === 'topRight') {
      const {
        originalHeight, originalWidth, originalMouseX, originalMouseY, originalY,
      } = sizingStartInitialParams.current;
      const { x: currentMouseX, y: currentMouseY } = getMousePosition(e);
      const width = originalWidth + (currentMouseX - originalMouseX);
      const height = originalHeight - (currentMouseY - originalMouseY);
      if (width > MINIMUM_SIZE) {
        rootRef.current?.setAttribute('width', width.toString());
      }
      if (height > MINIMUM_SIZE) {
        rootRef.current?.setAttribute('height', height.toString());
        const newY = originalY + currentMouseY - originalMouseY;
        rootRef.current?.setAttribute('y', newY.toString());
      }
    } else if (sizingStartInitialParams.current.resizeBtn === 'bottomLeft') {
      const {
        originalHeight, originalWidth, originalMouseX, originalMouseY, originalX,
      } = sizingStartInitialParams.current;
      const { x: currentMouseX, y: currentMouseY } = getMousePosition(e);
      const width = originalWidth - (currentMouseX - originalMouseX);
      const height = originalHeight + (currentMouseY - originalMouseY);
      if (width > MINIMUM_SIZE) {
        rootRef.current?.setAttribute('width', width.toString());
        const newX = originalX + currentMouseX - originalMouseX;
        rootRef.current?.setAttribute('x', newX.toString());
      }
      if (height > MINIMUM_SIZE) {
        rootRef.current?.setAttribute('height', height.toString());
      }
    } else {
      const {
        originalHeight, originalWidth, originalMouseX, originalMouseY,
      } = sizingStartInitialParams.current;
      const { x: currentMouseX, y: currentMouseY } = getMousePosition(e);
      const width = originalWidth + (currentMouseX - originalMouseX);
      const height = originalHeight + (currentMouseY - originalMouseY);
      if (width > MINIMUM_SIZE) {
        rootRef.current?.setAttribute('width', width.toString());
      }
      if (height > MINIMUM_SIZE) {
        rootRef.current?.setAttribute('height', height.toString());
      }
    }
    callBack();
  };

  return {
    onSizingStart,
    resize,
  };
};

export default useObjectSizing;
