import {
  MouseEvent,
  RefObject, useRef,
} from 'react';

const useObjectDrag = (rootRef: RefObject<SVGGElement>) => {
  const dragStartOffset = useRef<{x:number, y:number}>({ x: 0, y: 0 });

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
  const setDragInitialParams = (
    e: MouseEvent,
  ) => {
    if (rootRef.current) {
      const x = rootRef.current.getAttribute('x');
      const y = rootRef.current.getAttribute('y');
      dragStartOffset.current = {
        x: e.clientX,
        y: e.clientY,
      };
      dragStartOffset.current = getMousePosition(e);
      dragStartOffset.current.x -= Number(x);
      dragStartOffset.current.y -= Number(y);
    }
  };
  const getDragCurrentMousePos = (
    e: MouseEvent,
  ) => {
    if (dragStartOffset.current && rootRef.current) {
      const cords = getMousePosition(e);
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

export default useObjectDrag;
