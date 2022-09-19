import { useState, FormEvent, ChangeEvent } from "react";

// css
import classes from "./ImgCard.module.scss";

const ImgCard: React.FC<{ URL: string }> = (props) => {
  return (
    <div className={classes.container}>
      <img className={classes.img_card} src={props.URL} />
      <div className={classes.description}>
        <h2>음식 이름 ~~</h2>
        <h4>재료들~~~</h4>
        <h4>별점~~</h4>
      </div>
    </div>
  );
};

export default ImgCard;
