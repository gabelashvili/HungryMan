import { MutableRefObject, RefObject } from 'react';

const useDrag = () => {
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
    dragStartOffset: MutableRefObject<{x:number, y:number}>,
    isDragging: MutableRefObject<boolean>,
    showTools: boolean,
  ) => {
    if (rootRef.current && showTools) {
      isDragging.current = true;
      dragStartOffset.current = getMousePosition(e, rootRef);
      dragStartOffset.current.x -= parseFloat(rootRef.current.getAttribute('x') as string);
      dragStartOffset.current.y -= parseFloat(rootRef.current?.getAttribute('y') as string);
    }
  };
  const handleDrag = (
    e: MouseEvent,
    rootRef:RefObject<SVGGElement>,
    dragStartOffset: RefObject<{x:number, y:number}>,
    isDragging: boolean,
    callBack: ()=>void,
  ) => {
    if (isDragging && dragStartOffset.current && rootRef.current) {
      const cords = getMousePosition(e, rootRef);
      rootRef.current.setAttribute('x', (cords.x - dragStartOffset.current.x).toString());
      rootRef.current.setAttribute('y', (cords.y - dragStartOffset.current.y).toString());
      callBack();
    }
  };
  return {
    handleDragStart,
    handleDrag,
  };
};

export default useDrag;
