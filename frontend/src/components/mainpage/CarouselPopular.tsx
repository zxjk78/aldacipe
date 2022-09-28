import React, { useState, FormEvent, ChangeEvent } from 'react';
import Card from './CarouselCard';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import NextArrow from './NextArrow';
import PrevArrow from './PrevArrow';
// css, interface
import classes from './CarouselPopular.module.scss';
import { CardRecipe } from './interface';
const CarouselPopular = (props: { cardList: CardRecipe[] }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 5,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    // dotsClass: "custom-dots"
  };

  return (
    <>
      <section className={classes.carousel}>
        <Slider {...settings}>
          {props.cardList.map((card) => (
            <Card key={card.id} card={card} />
          ))}
        </Slider>
      </section>
    </>
  );
};

export default CarouselPopular;
