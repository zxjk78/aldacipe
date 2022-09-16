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
    autoplaySpeed: 5000,
    slidesToShow: 1,
    slidesToScroll: 1,
    // dotsClass: "custom-dots"
  }

  const imgList = [] 
  // img 데이터
  imgList.push('https://health.chosun.com/site/data/img_dir/2022/02/08/2022020800704_0.jpg');
  imgList.push('https://mediahub.seoul.go.kr/wp-content/uploads/2020/10/d13ea4a756099add8375e6c795b827ab.jpg');
  imgList.push('https://health.chosun.com/site/data/img_dir/2022/07/11/2022071101596_0.jpg');
  imgList.push('https://cdn.imweb.me/thumbnail/20190108/5c344b6b9b39a.jpg');

  return (
    <>
      <section className={classes.container}>
        <Slider {...settings}>
          {imgList.map((img:string)=>(<ImgCard key={Math.random()} URL={img}/>))}
        </Slider>
      </section>
    </>
  );
};

export default Banner;
