import { useState, FormEvent, ChangeEvent } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { Link } from 'react-router-dom';

// css, interfacde
import classes from './CarouselList.module.scss';
import { CardRecipe } from '../../util/interface';
import { API_URL } from '../../api/config/http-config';
import { recipe } from './interface';

const CarouselList = (props: { card: recipe }) => {
  return (
    <>
      <div className={classes.card}>
        <Link to={`/detail/${props.card.id}`}>
          <Card sx={{ maxWidth: 225 }}>
            <CardActionArea>
              <CardMedia
                component="img"
                height="150"
                image={`${API_URL}image?path=${props.card.image}`}
                // image={`${API_URL}image?path=${props.card.image}`}
                alt="요리 이미지"
              />
              <CardContent>
                <Typography gutterBottom variant="subtitle2" component="div">
                  {props.card.name.length < 7
                    ? props.card.name
                    : props.card.name.substring(0, 6) + '...'}
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

export default CarouselList;
