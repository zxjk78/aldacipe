import React, { useState } from "react";
import { Link } from "react-router-dom";
import Rating from '@mui/material/Rating';

// css
import classes from "./ImgCard.module.scss";
import IngredientItem from "./IngredientItem";

const ImgCard: React.FC<{ item: any }> = (props) => {

  return (
    <div className={classes.container}>
      <img className={classes.img_card} src={props.item.imgURL} />
      <div className={classes.description}>
        <h1 className={classes.h1}>오늘의 추천{props.item.idx}</h1>
        <h2 className={classes.h2}>{props.item.name}</h2>
        <div><Rating  name="half-rating-read" size="medium" defaultValue={props.item.grade} precision={0.5} readOnly />
        {props.item.grade.toFixed(1)}</div>
        <h3 className={classes.h3}>필요한 재료</h3>
        <div className={classes.ingredient}>
          {props.item.ingredient.map((item:string) => (
            <IngredientItem item={item}/>
          ))}
        </div>
        {/* <h4 >{props.item.grade}</h4> */}
        <Link className={classes.link} to={`/detail/${props.item.id}`}>자세히 보기</Link>
      </div>
    </div>
  );
};

export default ImgCard;
