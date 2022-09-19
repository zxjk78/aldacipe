import { useState, FormEvent, ChangeEvent } from "react";

// css
import classes from "./ImgCard.module.scss";

const ImgCard: React.FC<{ URL: string }> = (props) => {
  return (
    <>
      <img className={classes.img_card} src={props.URL} />
      <span>hihihi</span>
    </>
  );
};

export default ImgCard;
