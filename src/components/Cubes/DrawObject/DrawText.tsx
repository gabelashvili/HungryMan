import React, {
  MouseEvent, useEffect, useRef, useState,
} from 'react';
import useObjectDrag from '../hooks/useObjectDrag';

const DrawText = ({ text }: {text:{val:string, fontSize: number}}) => {
  const [isDragging, setDragging] = useState(false);
  const ref = useRef<SVGTextElement>(null);
  const { getDragCurrentMousePos, setDragInitialParams } = useObjectDrag(ref);

  const handleDrag = (e:MouseEvent) => {
    const mousePos = getDragCurrentMousePos(e);
    if (isDragging && ref.current && mousePos) {
      ref.current.setAttribute('x', mousePos.x.toString());
      ref.current.setAttribute('y', mousePos.y.toString());
    }
  };

  useEffect(() => {
    if (ref.current) {
      ref.current.setAttribute('x', '2');
      ref.current.setAttribute('y', text.fontSize.toString());
      ref.current.style.cursor = 'pointer';
    }
  }, []);
  return (
    <text
      onMouseDown={(e) => {
        setDragging(true);
        const ev = e as MouseEvent;
        setDragInitialParams(ev);
      }}
      onMouseMove={handleDrag}
      onMouseUp={() => setDragging(false)}
      fill="white"
      ref={ref}
      fontSize={text.fontSize}
    >
      {text.val}

    </text>
  );
};

export default DrawText;
