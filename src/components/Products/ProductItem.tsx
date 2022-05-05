import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { generatePath } from '../../helpers';
import ArrowIcon from '../../Icons/ArrowIcon';
import { ProductType } from '../../types/products';
import Button from '../shared/Button';

const ProductItem = ({ data }: {data: ProductType}) => {
  const [showMedia, setShowMedia] = useState(0);
  const navigate = useNavigate();

  const showNextSlide = (e: Event) => {
    e.stopPropagation();
    const mediaLength = data.medias.length;
    if (showMedia === mediaLength - 1) {
      setShowMedia(0);
    } else {
      setShowMedia(showMedia + 1);
    }
  };

  const showPrevSlide = (e: Event) => {
    e.stopPropagation();
    const mediaLength = data.medias.length;
    if (showMedia === 0) {
      setShowMedia(mediaLength - 1);
    } else {
      setShowMedia(showMedia - 1);
    }
  };

  return (
    <div className="products-item" onClick={() => navigate(data.id.toString())}>
      <picture className="products-item--image">
        {data.medias[showMedia]?.mediaType === 1 && <img src={generatePath(data.medias[showMedia].url)} alt="Product item" />}
        {data.medias[showMedia]?.mediaType === 2 && (
          <video controls>
            <source src={generatePath(data.medias[showMedia].url)} type="video/mp4" />
          </video>
        )}
        {data.medias.length > 1 && (
        <div className="products-item-controls">
          <Button type="icon" classes="is-rounded is-small" handleClick={showPrevSlide}>
            <ArrowIcon styles={{ transform: 'rotate(-180deg' }} />
          </Button>
          <Button type="icon" classes="is-rounded is-small" handleClick={showNextSlide}>
            <ArrowIcon />
          </Button>

        </div>
        )}
      </picture>

      <h6 className="products-item--title">{data.name}</h6>
      <p className="products-item--description">
        {data.description}
      </p>
      <span className="products-item--price">
        {data.price}
        {' '}
        ლ
      </span>
    </div>
  );
};

export default ProductItem;
