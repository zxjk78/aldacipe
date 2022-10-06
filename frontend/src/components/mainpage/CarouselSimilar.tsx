import React, { useState, FormEvent, ChangeEvent, useEffect } from 'react';
import Card from '../refrigerator/CarouselList';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import NextArrow from './NextArrow';
import PrevArrow from './PrevArrow';
// api
import { searchRecipeBySelectedIngredient } from '../../api/myrefrigerator';
// css
import classes from './CarouselSimilar.module.scss';
import { CardRecipe } from '../../util/interface';
import { recipe } from '../refrigerator/interface';
import selectImg from '../../assets/select.jpg';

import { Ingredient } from '../../util/interface';
import CardListLessThanThree from './CardListLessThanThree';
const CarouselSimilar = (props: { selectedItemList: Ingredient[] }) => {
  const [searchResult, setSearchResult] = useState<recipe[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    // dotsClass: "custom-dots"
  };

  useEffect(() => {
    setIsLoading(true);
    let tmp = [];
    for (let i = 0; i < props.selectedItemList.length; i++) {
      tmp.push(props.selectedItemList[i].id);
    }
    const ingredientQueryString = tmp.join('-');

    (async () => {
      const data = await searchRecipeBySelectedIngredient(
        ingredientQueryString
      );
      console.log(data);

      setSearchResult(data);
    })();
    setIsLoading(false);
  }, [props.selectedItemList]);

  return (
    <>
      {!isLoading && (
        <section className={classes.carousel}>
          {searchResult?.length === 0 ? (
            <img
              className={classes.img}
              src={selectImg}
              alt="재료를 선택해 주세요"
            />
          ) : searchResult?.length <= 3 ? (
            <CardListLessThanThree cardList={searchResult} />
          ) : (
            <Slider {...settings}>
              {searchResult.map((card: recipe) => (
                <Card card={card} key={card.id} />
              ))}
            </Slider>
          )}
        </section>
      )}
    </>
  );
};

export default CarouselSimilar;
