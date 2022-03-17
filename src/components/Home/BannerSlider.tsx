import { Swiper, SwiperSlide }  from "swiper/react";

import { FC } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Link } from "react-router-dom";
import SwiperCore, { Autoplay, Navigation } from "swiper";
import { resizeImage } from "../../shared/constants";

interface SliderProps {
  images: {
    title: string;
    image: string;
    link: string;
  }[];
}

const BannerSlider: FC<SliderProps> = ({ images }) => {
  SwiperCore.use([Autoplay]);
  return (
    <Swiper
      className="rounded-2xl overflow-hidden"
      modules={[Navigation]}
      navigation
      loop
      autoplay={images.length <= 1 ? false : { delay: 3000 }}
      slidesPerView={1}>
      {images.map((item) => (
        <SwiperSlide key={item.image}>
          <Link to={item.link}>
            <div className="w-full h-0 pb-[48%] relative">
              <LazyLoadImage
                className="absolute top-0 left-0 w-full h-full object-cover opacity-75"
                src={resizeImage(item.image, "900", "600")}
                alt=""
                effect="opacity"
              />
              <div className="bg-gradient-to-b from-transparent to-black w-full h-[40%] absolute bottom-[0]">
                <h1 className="absolute left-[7%] text-xl md:text-3xl max-w-[86%] bottom-[20%] whitespace-nowrap overflow-hidden">
                  {item.title}
                </h1>
              </div>
            </div>
          </Link>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default BannerSlider;
