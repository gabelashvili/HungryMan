import {
  MouseEvent,
  RefObject, useRef,
} from 'react';

const useUploadedImgDrag = () => {
  const dragStartOffset = useRef<{x:number, y:number}>({ x: 0, y: 0 });

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
      dragStartOffset.current = {
        x: e.clientX,
        y: e.clientY,
      };
      dragStartOffset.current = getMousePosition(e, rootRef);
      dragStartOffset.current.x -= x;
      dragStartOffset.current.y -= y;
    }
  };
  const getDragCurrentMousePos = (
    e: MouseEvent,
    rootRef:RefObject<SVGGElement>,
  ) => {
    if (dragStartOffset.current && rootRef.current) {
      const cords = getMousePosition(e, rootRef);
      return {
        x: (cords.x - dragStartOffset.current.x),
        y: cords.y - dragStartOffset.current.y,
      };
    }
    return null;
  };

  return {
    setDragInitialParams,
    getDragCurrentMousePos,
  };
};

export default useUploadedImgDrag;
