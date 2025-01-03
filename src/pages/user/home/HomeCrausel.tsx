import React from 'react';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { CarouselItem } from '@/types/home';
import { getImageUrl } from '@/utils/env';

interface HomeCarouselProps {
  carouselItems: CarouselItem[];
}

const HomeCarousel: React.FC<HomeCarouselProps> = ({ carouselItems }) => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };

  return (
    <main className="w-full md:w-[calc(960px-40px)]">
      <Slider className="w-full cursor-grab" {...settings}>
        {carouselItems.map((carousel, index) => (
          <a href={carousel.route_link} key={index} className="block h-[180px] md:h-[600px]">
            <img 
              src={getImageUrl(carousel.image as any)} 
              alt={`Carousel ${index + 1}`} 
              className="w-full h-full object-cover object-center rounded-[30px]" 
            />
          </a>
        ))}
      </Slider>
    </main>
  );
};

export default HomeCarousel;