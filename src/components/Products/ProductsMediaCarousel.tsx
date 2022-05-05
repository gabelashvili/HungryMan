import { useRef } from 'react';
import { generatePath } from '../../helpers';
import ArrowIcon from '../../Icons/ArrowIcon';
import { MediaType } from '../../types/main';
import Button from '../shared/Button';

const ProductsMediaCarousel = ({ data }: {data: MediaType[]}) => {
  const sliderListRef = useRef<HTMLDivElement | null>(null);

  return (
    <div className="product-details-slider">
      <picture className="product-details-slider--image">
        <img src={generatePath(data[0].url)} alt="t" />
      </picture>
      <div className="product-details-slider--wrapper">
        <Button
          type="icon"
          classes=" is-small is-rounded"
          handleClick={() => console.log('next')}
        >
          <ArrowIcon styles={{ transform: 'rotate(180deg)' }} />
        </Button>
        <div className="product-details-slider--list-wrapper">
          <div className="product-details-slider--list" ref={sliderListRef}>
            {data.map((el) => (
              el.mediaType === 1 && (
              <picture className="product-details-slider--item" key={el.url}>
                <img src={generatePath(el.url)} alt="" key={el.url} />
              </picture>
              )
            // : (
            //   <video controls style={{ width: '100%', height: '100%' }}>
            //     <source src={generatePath(el.url)} type="video/mp4" />
            //   </video>
            // )
            ))}
          </div>
        </div>
        <Button
          type="icon"
          classes=" is-small is-rounded"
          handleClick={() => console.log('next')}
        >
          <ArrowIcon />
        </Button>
      </div>
    </div>
  );
};

export default ProductsMediaCarousel;
