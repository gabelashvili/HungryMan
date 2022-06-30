import {
  Dispatch, SetStateAction, useEffect, useRef,
} from 'react';
import { Text, Transformer } from 'react-konva';

const TextWrapper = ({
  x, y, text, id, fontSize, selectedObjId, setSelectedObjId, fill, fontFamily,
}: PropsTypes) => {
  const shapeRef = useRef<any>();
  const trRef = useRef<any>();

  useEffect(() => {
    if (text && trRef.current) {
      trRef.current.nodes([shapeRef.current]);
      trRef.current.getLayer().batchDraw();
    }
  }, [text]);

  return (
    <>
      <Text
        fill={fill}
        fontSize={fontSize}
        text={text}
        onClick={() => setSelectedObjId(id)}
        onTap={() => setSelectedObjId(id)}
        ref={shapeRef}
        x={x}
        y={y}
        draggable
        fontFamily={fontFamily}
      />
      {(
        <Transformer
          anchorFill={selectedObjId === id ? 'red' : 'white'}
          anchorStroke={selectedObjId === id ? 'red' : 'white'}
          borderStroke={selectedObjId === id ? 'red' : '#07979E'}
          enabledAnchors={['top-left', 'top-right', 'bottom-left', 'bottom-right']}
          ref={trRef}
          boundBoxFunc={(oldBox, newBox) => {
          // limit resize
            if (newBox.width < 5 || newBox.height < 5) {
              return oldBox;
            }
            return newBox;
          }}
        />
      )}
    </>
  );
};

export default TextWrapper;

interface PropsTypes {
  x: number,
  y: number,
  id: string,
  fontSize: number,
  text: string,
  selectedObjId: null | string,
  setSelectedObjId: Dispatch<SetStateAction<null | string >>,
  fill: string,
  fontFamily: string
}
