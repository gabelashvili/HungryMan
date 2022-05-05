import clsx from 'clsx';
import React, { useRef, useState } from 'react';
import { generatePath } from '../../helpers';
import ArrowIcon from '../../Icons/ArrowIcon';
import { MediaType } from '../../types/main';
import Button from '../shared/Button';

const ProductsMediaCarousel = ({ data }: {data: MediaType[]}) => {
  const [disableNextBtn, setDisableNextBtn] = useState<boolean>(false);
  const [disablePrevBtn, setDisablePrevBtn] = useState<boolean>(true);
  const [active, setActive] = useState<number >(0);
  const sliderListRef = useRef<HTMLDivElement | null>(null);

  const showPrevSlide = () => {
    if (sliderListRef.current) {
      const parentElem = sliderListRef.current;
      sliderListRef.current.scrollLeft -= parentElem.children[0].clientWidth;
      sliderListRef?.current?.scrollLeft;
      setDisablePrevBtn(sliderListRef?.current?.scrollLeft === 0);
      setDisableNextBtn(sliderListRef.current.offsetWidth + sliderListRef.current.scrollLeft
            >= sliderListRef.current.scrollWidth);
    }
  };

  const showNextSlide = () => {
    if (sliderListRef.current) {
      const parentElem = sliderListRef.current;
      sliderListRef.current.scrollLeft += parentElem.children[0].clientWidth;
      setDisablePrevBtn(sliderListRef?.current?.scrollLeft === 0);
      setDisableNextBtn(sliderListRef.current.offsetWidth + sliderListRef.current.scrollLeft
            >= sliderListRef.current.scrollWidth);
    }
  };
  return (
    <div className="product-details-slider">
      {data[active].mediaType === 1 ? (
        <picture className="product-details-slider--image">
          <img src={generatePath(data[active].url)} alt="t" />
        </picture>
      ) : (
        <div className="product-details-slider--image">
          <video controls style={{ position: 'absolute', width: '100%' }}>
            <source src={generatePath(data[active].url)} type="video/mp4" />
          </video>
        </div>
      )}

      <div className="product-details-slider--wrapper">
        <Button
          disabled={disablePrevBtn}
          handleClick={showPrevSlide}
          type="icon"
          classes=" is-small is-rounded"
        >
          <ArrowIcon styles={{ transform: 'rotate(180deg)' }} />
        </Button>
        <div className="product-details-slider--list-wrapper">
          <div className={clsx('product-details-slider--list', !disablePrevBtn && 'blur-start', !disableNextBtn && 'blur-end')} ref={sliderListRef}>
            {data.map((el, i) => (
              el.mediaType === 1 ? (
                <picture className={clsx('product-details-slider--item', active === i && 'active')} key={el.url} onClick={() => setActive(i)}>
                  <img src={generatePath(el.url)} alt="" key={el.url} />
                </picture>
              )
                : (
                  <video className={clsx('product-details-slider--item', active === i && 'active')} onClick={() => setActive(i)} src={generatePath(el.url)} />
                )
            ))}
          </div>
        </div>
        <Button
          disabled={disableNextBtn}
          handleClick={showNextSlide}
          type="icon"
          classes=" is-small is-rounded"
        >
          <ArrowIcon />
        </Button>
      </div>
    </div>
  );
};

export default ProductsMediaCarousel;
