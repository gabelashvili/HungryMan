import { RefObject, useRef } from 'react';

const useDrag = () => {
  const dragStartOffset = useRef<{x:number, y:number}>({ x: 0, y: 0 });
  const isDragging = useRef<boolean>(false);

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
    showTools: boolean,
  ) => {
    if (rootRef.current && showTools) {
      isDragging.current = true;
      dragStartOffset.current = {
        x: e.clientX,
        y: e.clientY,
      };
      isDragging.current = true;
      dragStartOffset.current = getMousePosition(e, rootRef);
      dragStartOffset.current.x -= parseFloat(rootRef.current.getAttribute('x') as string);
      dragStartOffset.current.y -= parseFloat(rootRef.current?.getAttribute('y') as string);
    }
  };
  const handleDrag = (
    e: MouseEvent,
    rootRef:RefObject<SVGGElement>,
    callBack: ()=>void,
  ) => {
    if (isDragging.current && dragStartOffset.current && rootRef.current) {
      const cords = getMousePosition(e, rootRef);
      rootRef.current.setAttribute('x', (cords.x - dragStartOffset.current.x).toString());
      rootRef.current.setAttribute('y', (cords.y - dragStartOffset.current.y).toString());
      callBack();
    }
  };

  const handleDragEnd = () => {
    isDragging.current = false;
  };
  return {
    handleDragStart,
    handleDrag,
    handleDragEnd,
  };
};

export default useDrag;
