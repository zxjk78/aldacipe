import React, { useState, FormEvent, ChangeEvent } from 'react';
import Card from './SearchCarouselCard';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import NextArrow from '../mainpage/NextArrow';
import PrevArrow from '../mainpage/PrevArrow';
// css, interface
import classes from './CarouselSearch.module.scss';
import { SearchRecipe } from '../../util/interface';
const CarouselSearch = (props: { cardList: SearchRecipe[] }) => {
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

export default CarouselSearch;
