import React from 'react';

const Images = ({ images }: PropsTypes) => {
  console.log(images);
  return (
    <div>Images</div>
  );
};

export default Images;

interface PropsTypes {
    images: {id:string, file?:File, base64:string }[]
}
