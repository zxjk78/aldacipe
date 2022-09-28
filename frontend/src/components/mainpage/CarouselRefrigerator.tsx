import React, { useState, FormEvent, ChangeEvent } from 'react';
import Card from './CarouselCard';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import NextArrow from './NextArrow';
import PrevArrow from './PrevArrow';
import { refrigeratorRecipe } from '../../api/main'
// css
import classes from './CarouselRefrigerator.module.scss';
const CarouselRefrigerator: React.FC<{}> = () => {
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

  const cardList = [];
  // axios 로 데이터 20개 받아와서 map 돌릴 예정
  cardList.push(['key1', 'value1', 'value2']);
  cardList.push(['key2', 'value1', 'value2']);
  cardList.push(['key3', 'value1', 'value2']);
  cardList.push(['key4', 'value1', 'value2']);
  cardList.push(['key5', 'value1', 'value2']);
  cardList.push(['key6', 'value1', 'value2']);
  cardList.push(['key7', 'value1', 'value2']);
  cardList.push(['key8', 'value1', 'value2']);
  cardList.push(['key9', 'value1', 'value2']);
  cardList.push(['key10', 'value1', 'value2']);
  cardList.push(['key11', 'value1', 'value2']);
  // const data = refrigeratorRecipe
  // console.log(data)

  return (
    <>
      <section className={classes.carousel}>
        <Slider {...settings}>
          {/* {cardList.map((card:string[])=>(<Card key={card[0]}/>))} */}
        </Slider>
      </section>
    </>
  );
};

export default CarouselRefrigerator;
