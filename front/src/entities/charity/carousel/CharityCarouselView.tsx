import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import { CharityCardView } from '../card';

const contentStyle: React.CSSProperties = {
  margin: 0,
  height: '160px',
  color: '#fff',
  lineHeight: '160px',
  textAlign: 'center',
  background: '#364d79',
};

export const CharityCarouselView = () => {
  return (
    <Swiper className="mySwiper" slidesPerView="auto" spaceBetween={20} centeredSlides>
      <SwiperSlide>
        <CharityCardView />
      </SwiperSlide>
      <SwiperSlide>
        <CharityCardView />
      </SwiperSlide>
      <SwiperSlide>
        <CharityCardView />
      </SwiperSlide>
      <SwiperSlide>
        <CharityCardView />
      </SwiperSlide>
      <SwiperSlide>
        <CharityCardView />
      </SwiperSlide>
      <SwiperSlide>
        <CharityCardView />
      </SwiperSlide>
      <SwiperSlide>
        <CharityCardView />
      </SwiperSlide>
      <SwiperSlide>
        <CharityCardView />
      </SwiperSlide>
      <SwiperSlide>
        <CharityCardView />
      </SwiperSlide>
    </Swiper>
  );
};
