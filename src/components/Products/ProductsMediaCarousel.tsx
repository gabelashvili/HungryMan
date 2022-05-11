/* eslint-disable import/no-unresolved */
import { Swiper, SwiperSlide } from 'swiper/react';
import { useState } from 'react';
import SwiperCore, { Navigation } from 'swiper';
import clsx from 'clsx';
import { generatePath } from '../../helpers';
import ArrowIcon from '../../Icons/ArrowIcon';
import { MediaType } from '../../types/main';
import Button from '../shared/Button';
import 'swiper/css';
import 'swiper/css/navigation';

SwiperCore.use([Navigation]);
const ProductsMediaCarousel = ({ data }: {data: MediaType[]}) => {
  const [active, setActive] = useState<number>(0);
  return (
    <div className="product-details-slider">
      {data[active]?.mediaType === 1 ? (
        <picture className="product-details-slider--image">
          <img src={generatePath(data[active]?.url)} alt="t" />
        </picture>
      ) : (
        <div className="product-details-slider--image">
          <video controls style={{ position: 'absolute', width: '100%' }}>
            <source src={generatePath(data[active]?.url)} type="video/mp4" />
          </video>
        </div>
      )}
      <div className="product-details--slider-swiper">
        <Button
          type="icon"
          classes="is-small is-rounded"
          id="swiper-prev"
        >
          <ArrowIcon styles={{ transform: 'rotate(180deg)' }} />
        </Button>

        <Swiper
          slidesPerView={1}
          initialSlide={1}
          loop
          navigation={{
            prevEl: '#swiper-prev',
            nextEl: '#swiper-next',
          }}
          centeredSlides
          className="mySwiper"
          breakpoints={sliderBreakPoints}
        >

          {data.map((el, i) => (
            <SwiperSlide onClick={() => setActive(i)} key={el.id}>
              {el?.mediaType === 1 ? (
                <picture className={clsx('product-details-slider--item', i === active && 'active')} key={el.url}>
                  <img src={generatePath(el.url, true)} alt="" key={el.url} />
                </picture>
              )
                : (
                  <video className={clsx('product-details-slider--item', i === active && 'active')} src={generatePath(el.url)} key={el.url} />
                )}
            </SwiperSlide>
          ))}
        </Swiper>
        <Button
          type="icon"
          classes=" is-small is-rounded"
          id="swiper-next"
        >
          <ArrowIcon />
        </Button>
      </div>
    </div>
  );
};

export default ProductsMediaCarousel;

const sliderBreakPoints = {
  380: {
    slidesPerView: 2,
    spaceBetween: 20,
  },
  768: {
    slidesPerView: 3,
    spaceBetween: 20,
  },
  1024: {
    slidesPerView: 4,
    spaceBetween: 10,
  },
};
