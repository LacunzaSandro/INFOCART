import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import styles from "./imageSlider.module.css";
// eslint-disable-next-line react/prop-types
const ImageSlider = ({ images }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <Slider {...settings} className={styles.slider}>
      {images.map((image, index) => (
        <div key={index} className={styles.slide}>
          <img
            src={image}
            alt={`Slide ${index + 1}`}
            className={styles.image}
          />
        </div>
      ))}
    </Slider>
  );
};

export default ImageSlider;
