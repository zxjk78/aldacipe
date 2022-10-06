import React, { useState, FormEvent, ChangeEvent } from 'react';
import ImgCard from './ImgCard';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
// css
import classes from './Banner.module.scss';
const Banner: React.FC<{}> = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 1000,
    autoplay: true,
    autoplaySpeed: 4000,
    slidesToShow: 1,
    slidesToScroll: 1,
    // dotsClass: "custom-dots"
  }

  const imgList = [
    {
      id: 1,
      name: '제육볶음',
      ingredient: ['돼지고기', '양파', '청양고추', '대파'],
      imgURL:'https://recipe1.ezmember.co.kr/cache/recipe/2020/09/08/52110f292b905a27c30ea6bfed246a491.jpg'
    },
    {
      id: 2,
      name: '투움바 파스타',
      ingredient: [''],
      imgURL: 'https://simg.ssgcdn.com/trans.ssg?src=/cmpt/edit/202009/04/102020090410232211015562585556_930.jpg&w=830&t=6bee0e607b448ab3f0227e460a37ce5ab357a10f'
    }
  ] 

  return (
    <>
      <section className={classes.container}>
        <Slider {...settings}>
          {imgList.map((item:any)=>(<ImgCard key={Math.random()} item={item}/>))}
        </Slider>
      </section>
    </>
  );
};

export default Banner;
