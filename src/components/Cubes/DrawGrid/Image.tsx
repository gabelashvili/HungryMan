import {
  Dispatch, SetStateAction, useEffect, useRef, useState,
} from 'react';
import { Image as KonvaImg, Transformer } from 'react-konva';

const ImageWrapper = ({
  x, y, selectedObjId, setSelectedObjId, file,
}: PropsTypes) => {
  const [img, setImg] = useState<HTMLImageElement| null>(null);
  const shapeRef = useRef<any>();
  const trRef = useRef<any>();
  console.log(selectedObjId);
  useEffect(() => {
    if (trRef.current && img) {
      trRef.current.nodes([shapeRef.current]);
      trRef.current.getLayer().batchDraw();
    }
  }, [img]);

  useEffect(() => {
    if (file?.file) {
      const image = new Image();
      image.src = URL.createObjectURL(file.file);
      image.onload = () => {
        setImg(image);
      };
    }
  }, [file]);

  return img ? (
    <>
      <KonvaImg
        image={img}
        onClick={() => setSelectedObjId(file.id)}
        onTap={() => setSelectedObjId(file.id)}
        ref={shapeRef}
        x={x}
        y={y}
        width={200}
        height={200}
        draggable
      />
      { (
        <Transformer
          keepRatio
          centeredScaling
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
  ) : null;
};

export default ImageWrapper;

  interface PropsTypes {
    x: number,
    y: number,
    selectedObjId: null | string,
    setSelectedObjId: Dispatch<SetStateAction<null | string >>,
    file: {
        id: string;
        file?: File ;
        base64?: string ;
        value?: string ;
    }
  }
