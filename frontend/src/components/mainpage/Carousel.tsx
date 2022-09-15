import React, { useState, FormEvent, ChangeEvent } from 'react';
import Card from './CarouselCard';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import NextArrow from "./NextArrow";
import PrevArrow from "./PrevArrow";
// css
import classes from './Carousel.module.scss';
const Carousel: React.FC<{}> = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 5,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    // dotsClass: "custom-dots"
  }

  const cardList = [] 
  // axios 로 데이터 20개 받아와서 map 돌릴 예정
  cardList.push(['keyOne','value1', 'value2']);
  cardList.push(['key2', 'value1', 'value2']);
  cardList.push(['key3', 'value1', 'value2']);
  cardList.push(['key4', 'value1', 'value2']);
  cardList.push(['key5', 'value1', 'value2']);
  cardList.push(['key6', 'value1', 'value2']);
  cardList.push(['key7', 'value1', 'value2']);
  cardList.push(['key8', 'value1', 'value2']);
  cardList.push(['key9', 'value1', 'value2']);
  cardList.push(['key10', 'value1', 'value2']);
  cardList.push(['key11','value1', 'value2']);
  cardList.push(['key12', 'value1', 'value2']);
  cardList.push(['key13', 'value1', 'value2']);
  cardList.push(['key14', 'value1', 'value2']);
  cardList.push(['key15', 'value1', 'value2']);
  cardList.push(['key16', 'value1', 'value2']);
  cardList.push(['key17', 'value1', 'value2']);
  cardList.push(['key18', 'value1', 'value2']);
  cardList.push(['key19', 'value1', 'value2']);
  cardList.push(['key20', 'value1', 'value2']);

  return (
    <>
      <section className={classes.carousel}>
        <Slider {...settings}>
          {cardList.map((card:string[])=>(<Card key={card[0]} title={card[0]}/>))}
        </Slider>
      </section>
    </>
  );
};

export default Carousel;
