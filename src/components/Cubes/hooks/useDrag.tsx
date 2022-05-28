import {
  MouseEvent,
  RefObject, useEffect, useRef,
} from 'react';

const useDrag = (specialKey?:string) => {
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
  const handleDragStart = (
    e: MouseEvent,
    rootRef: RefObject<SVGGElement>,
    x:number,
    y:number,
  ) => {
    if (rootRef.current && ((specialKey && isSpecialKeyPressed.current) || !specialKey)) {
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
  const handleDrag = (
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

  const handleDragEnd = () => {
    isDragging.current = false;
    isSpecialKeyPressed.current = false;
  };

  const handleSpecialKeyDown = (e: any) => {
    if (e.key === ' ') {
      isSpecialKeyPressed.current = true;
    }
  };

  const handleSpecialKeyUp = (e: any) => {
    if (e.key === ' ') {
      isSpecialKeyPressed.current = false;
      isDragging.current = false;
    }
  };

  useEffect(() => {
    if (specialKey) {
      window.addEventListener('keypress', (e) => handleSpecialKeyDown(e));
      window.addEventListener('keyup', (e) => handleSpecialKeyUp(e));
    }

    return () => {
      window.removeEventListener('keydown', (e) => handleSpecialKeyDown(e));
      window.removeEventListener('keyup', (e) => handleSpecialKeyUp(e));
    };
  }, [specialKey]);
  return {
    handleDragStart,
    handleDrag,
    handleDragEnd,
  };
};

export default useDrag;
