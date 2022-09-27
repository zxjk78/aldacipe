import { useState, FormEvent, ChangeEvent } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

// css, interfacde
import classes from './CarouselCard.module.scss';
import { CardRecipe } from './interface';
import { API_URL } from '../../api/config/http-config';
const CarouselCard = (props: { card: CardRecipe }) => {
  return (
    <>
      <div className={classes.card}>
        <Card sx={{ maxWidth: 225 }}>
          <CardActionArea>
            <CardMedia
              component="img"
              height="150"
              image={`${API_URL}image/${props.card.imgURL}`}
              alt="green iguana"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {props.card.name}
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
