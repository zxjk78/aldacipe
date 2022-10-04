import { useState, FormEvent, ChangeEvent } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { Link } from 'react-router-dom';

// css, interfacde
import classes from './CarouselCard.module.scss';
import { CardRecipe } from './interface';
import { API_URL } from '../../api/config/http-config';
import { recipe } from '../refrigerator/interface';

const CarouselCard = (props: { card: recipe }) => {
  return (
    <>
      <div className={classes.card}>
        <Link to={`/detail/${props.card.id}`}>
          <Card sx={{ maxWidth: 225 }}>
            <CardActionArea>
              <CardMedia
                component="img"
                height="150"
                // image={`${API_URL}image/${props.card.imgURL}`}
                image={`${API_URL}image?path=${props.card.image}`}
                alt="green iguana"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {props.card.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {/* {props.card.avgScore} */}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Link>
      </div>
    </>
  );
};

export default CarouselCard;
