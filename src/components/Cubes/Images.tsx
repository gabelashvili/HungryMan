import React, {
  Dispatch, SetStateAction, useRef,
} from 'react';
import DrawObject from './DrawObject/DrawObject';

const Images = ({ images, selectedObjectId, setSelectedObjectId }: PropsTypes) => {
  const rootRef = useRef<SVGGElement>(null);

  return (
    <g ref={rootRef}>
      {images.map((el) => (
        <DrawObject
          image={el}
          key={el.id}
          isSelected={selectedObjectId === el.id}
          setSelectedObjectId={setSelectedObjectId}
        />
      ))}
    </g>
  );
};

export default Images;

interface PropsTypes {
    images: {id:string, file?:File, base64:string }[],
    selectedObjectId: string,
    setSelectedObjectId: Dispatch<SetStateAction<string>>
}
