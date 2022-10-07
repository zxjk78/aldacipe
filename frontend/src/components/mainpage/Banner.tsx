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

  const imgList = [
    {
      id: 174,
      idx: 1,
      grade: 4.0,
      name: '단호박 제육볶음',
      ingredient: ['돼지고기', '양파', '당근', '마늘', '청양고추', '대파', '간장', '물엿', '고추가루'],
      imgURL:'https://recipe1.ezmember.co.kr/cache/recipe/2020/09/08/52110f292b905a27c30ea6bfed246a491.jpg'
    },
    {
      id: 6862912,
      idx: 2,
      grade: 4.9,
      name: '신라면 투움바 파스타',
      ingredient: ['신라면', '양파', '버터', '새우', '파슬리', '마늘', '슬라이스 치즈', '우유', '올리브오일'],
      imgURL: 'https://simg.ssgcdn.com/trans.ssg?src=/cmpt/edit/202009/04/102020090410232211015562585556_930.jpg&w=830&t=6bee0e607b448ab3f0227e460a37ce5ab357a10f'
    },
    {
      id: 6876003,
      idx: 3,
      grade: 4.9,
      name: '안동 찜닭',
      ingredient: ['닭 한마리', '당면', '감자', '양파', '당근', '오이', '대파', '청고추'],
      imgURL: 'https://simg.ssgcdn.com/trans.ssg?src=/cmpt/edit/202011/24/192020112419505167485236942623_319.jpg&w=830&t=23c74928e8370230d5ad0a0e8099020411c5cc68'
    },
    {
      id: 6954272,
      idx: 4,
      grade: 4.7,
      name: '떡볶이',
      ingredient: ['떡볶이 떡', '대파', '통깨', '고추장', '고추가루', '간장', '설탕'],
      imgURL: 'https://doewxs707ovkc.cloudfront.net/v3/prod/image/item/mainpage/907/ad4474bef39c4167b84477eaa7a5052f20210708171733.'
    },
    {
      id: 733,
      idx: 5,
      grade: 5,
      name: '닭곰탕',
      ingredient: ['닭', '마늘', '양파', '대파', '통후추', '고추가루', '국간장'],
      imgURL: 'https://shop.biumfood.com/upload/1561613382image_product021.jpg'
    }
  ] 

  return (
    <>
      <section className={classes.container}>
        <Slider {...settings}>
          {imgList.map((item:any)=>(<ImgCard key={Math.random()} item={item} />))}
        </Slider>
      </section>
    </>
  );
};

export default Banner;
