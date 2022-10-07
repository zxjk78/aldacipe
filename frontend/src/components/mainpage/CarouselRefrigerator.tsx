import React, { useState, FormEvent, ChangeEvent } from 'react';
import Card from './CarouselCard';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import NextArrow from './NextArrow';
import PrevArrow from './PrevArrow';
import { refrigeratorRecipe } from '../../api/main';
// css
import classes from './CarouselRefrigerator.module.scss';
import { CardRecipe } from '../../util/interface';

const CarouselRefrigerator = (props: { list: never[] }) => {
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

  const cardList = props.list;

  return (
    <>
      {cardList.length===0 && <div className={classes.empty_container}> 추천을 위한 데이터가 아직 입력되지 않았습니다.</div>}
      <section className={classes.carousel}>
        <Slider {...settings}>
          {cardList.map((card: CardRecipe) => (
            <Card card={card} key={card.id} />
          ))}
        </Slider>
      </section>
    </>
  );
};

export default CarouselRefrigerator;
