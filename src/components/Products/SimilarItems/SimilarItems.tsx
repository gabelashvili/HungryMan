/* eslint-disable import/no-unresolved */
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation } from 'swiper';
import ArrowIcon from '../../../Icons/ArrowIcon';
import { Product, ProductType } from '../../../types/products';
import Button from '../../shared/Button';
import './similar-items.scss';
import 'swiper/css';
import 'swiper/css/navigation';
import ProductItem from '../ProductItem';

SwiperCore.use([Navigation]);

const SimilarItems = ({ data }: {data: Product[]}) => {
  return (
    <div className="products-carousel">
      <div className="products-carousel--header">
        <div className="products-carousel--heading">
          <h4 className="products-carousel--title">მსგავსი პროდუქცია</h4>
          <p className="products-carousel--description">
            ჩვენს მიერ შეთავაზებული მსგავსი პროდუქცია
          </p>
        </div>

        <div className="products-carousel--controls">
          <Button
            id="swiper-prev-products"
            type="icon"
            classes=" is-rounded is-small"
          >
            <ArrowIcon styles={{ transform: 'rotate(180deg)' }} />
          </Button>
          <Button id="swiper-next-products" type="icon" classes=" is-rounded is-small"><ArrowIcon /></Button>
        </div>
      </div>

      <Swiper
        slidesPerView={1}
        spaceBetween={10}
        initialSlide={1}
        loopFillGroupWithBlank
        navigation={{
          prevEl: '#swiper-prev-products',
          nextEl: '#swiper-next-products',
        }}
        breakpoints={sliderBreakPoints}
      >
        {data.map((el) => (
          <SwiperSlide key={el.id}>
            <ProductItem data={el as ProductType} disableSlider />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>

  );
};

export default SimilarItems;

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
