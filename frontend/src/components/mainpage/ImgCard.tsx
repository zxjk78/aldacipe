import { useState, FormEvent, ChangeEvent } from "react";

// css
import classes from "./ImgCard.module.scss";

const ImgCard: React.FC<{ item: any }> = (props) => {
  return (
    <div className={classes.container}>
      <img className={classes.img_card} src={props.item.imgURL} />
      <div className={classes.description}>
        <h1 className={classes.h1}>오늘의 추천{props.item.id}</h1>
        <h2 className={classes.h2}>{props.item.name}</h2>
        <h4>{props.item.ingredient.map((item:any) => item)}</h4>
        <h4>별점~~</h4>
      </div>
    </div>
  );
};

export default ImgCard;
