import {
  MouseEvent,
  RefObject, useRef,
} from 'react';

const useUploadedImgDrag = () => {
  const dragStartOffset = useRef<{x:number, y:number}>({ x: 0, y: 0 });
  const isDragging = useRef<boolean>(false);
  const isSpecialKeyPressed = useRef<boolean>(false);

  const getMousePosition = (evt: MouseEvent, rootRef: RefObject<SVGGElement>) => {
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
  const setDragInitialParams = (
    e: MouseEvent,
    rootRef: RefObject<SVGGElement>,
    x:number,
    y:number,
  ) => {
    if (rootRef.current) {
      isDragging.current = true;
      dragStartOffset.current = {
        x: e.clientX,
        y: e.clientY,
      };
      isDragging.current = true;
      dragStartOffset.current = getMousePosition(e, rootRef);
      dragStartOffset.current.x -= x;
      dragStartOffset.current.y -= y;
    }
  };
  const getDragCurrentMousePos = (
    e: MouseEvent,
    rootRef:RefObject<SVGGElement>,
  ) => {
    if (isDragging.current && dragStartOffset.current && rootRef.current) {
      const cords = getMousePosition(e, rootRef);
      return {
        x: (cords.x - dragStartOffset.current.x),
        y: cords.y - dragStartOffset.current.y,
      };
    }
    return null;
  };

  const disableDrag = () => {
    isDragging.current = false;
    isSpecialKeyPressed.current = false;
  };

  return {
    setDragInitialParams,
    getDragCurrentMousePos,
    disableDrag,
  };
};

export default useUploadedImgDrag;
