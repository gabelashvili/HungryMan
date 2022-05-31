import React from 'react';
import DrawObject from './DrawObject/DrawObject';

const Images = ({ images }: PropsTypes) => {
  console.log(images);
  return (
    <g>
      {images.map((el) => <DrawObject image={el} key={el.id} />)}
    </g>
  );
};

export default Images;

interface PropsTypes {
    images: {id:string, file?:File, base64:string }[]
}
