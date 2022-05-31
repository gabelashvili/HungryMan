import React, { useEffect, useRef } from 'react';

const DrawText = ({ text }: {text:{val:string, fontSize: number}}) => {
  const ref = useRef<SVGTextElement>(null);
  console.log(text.val);

  useEffect(() => {
    if (ref.current) {
      ref.current.setAttribute('x', '2');
      ref.current.setAttribute('y', text.fontSize.toString());
      ref.current.style.cursor = 'pointer';
    }
  }, []);
  return (
    <text fill="white" ref={ref} fontSize={text.fontSize}>{text.val}</text>
  );
};

export default DrawText;
