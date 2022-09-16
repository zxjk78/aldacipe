import { useState, FormEvent, ChangeEvent } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";

// css
import classes from "./CarouselCard.module.scss";
const CarouselCard: React.FC<{ title: string }> = (props) => {
  return (
    <>
      <div className={classes.card}>
        <Card sx={{ maxWidth: 225 }}>
          <CardActionArea>
            <CardMedia
              component="img"
              height="150"
              image="https://health.chosun.com/site/data/img_dir/2022/07/11/2022071101596_0.jpg"
              alt="green iguana"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                음식이름
                {props.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                간단한 내용 설명 간단한 내용 설명 간단한 내용 설명 간단한 내용
                설명 간단한 내용 설명 간단한 내용 설명 간단한 내용 설명
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </div>
    </>
  );
};

export default CarouselCard;
