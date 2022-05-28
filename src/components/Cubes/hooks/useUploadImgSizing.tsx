import { MouseEvent, RefObject, useRef } from 'react';

const useUploadImgSizing = (rootRef: RefObject<SVGGElement>) => {
  const isSizing = useRef<boolean>(false);
  const sizingStartMousePos = useRef<{x:number, y:number}>({ x: 0, y: 0 });

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

  const onResizeBtnClick = (e:MouseEvent, x:number, y:number) => {
    isSizing.current = true;
    sizingStartMousePos.current = {
      x: e.clientX,
      y: e.clientY,
    };
    sizingStartMousePos.current = getMousePosition(e);
    sizingStartMousePos.current.x -= x;
    sizingStartMousePos.current.y -= y;
  };

  const onResizeBtnMove = (e:MouseEvent) => {
    if (isSizing.current) {
      const cords = getMousePosition(e);
      const x = cords.x - sizingStartMousePos.current.x;
      const y = cords.y - sizingStartMousePos.current.y;
      sizingStartMousePos.current = getMousePosition(e);
      return { x, y };
    }
    return null;
  };

  const onResizeBtnUp = () => {
    isSizing.current = false;
  };
  return {
    onResizeBtnClick,
    onResizeBtnMove,
    onResizeBtnUp,
  };
};

export default useUploadImgSizing;
