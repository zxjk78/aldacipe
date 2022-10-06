import { useState, FormEvent, ChangeEvent } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { Link } from 'react-router-dom';
import Rating from '@mui/material/Rating';
// css, interfacde
import classes from './SearchCarouselCard.module.scss';
import { SearchRecipe } from '../../util/interface';
import { API_URL } from '../../api/config/http-config';

const SearchCarouselCard = (props: { card: SearchRecipe }) => {
  return (
    <>
      <div className={classes.card}>
        <Link to={`/detail/${props.card.id}`}>
          <Card sx={{ maxWidth: 225, minHeight: 300, maxHeight: 300 }}>
            <CardActionArea>
              <CardMedia
                component="img"
                height="150"
                image={`${API_URL}image?path=${props.card.image}`}
                // image={`${API_URL}image?path=${props.card.image}`}
                alt="green iguana"
              />
              <CardContent>
                {/* <Typography gutterBottom variant="h5" component="div"> */}
                <span className={classes.middle_text}>
                  {props.card.name.length < 22
                    ? props.card.name
                    : props.card.name.substring(0, 22) + '⋯'}
                </span>
                {/* </Typography> */}

                <Typography variant="body2" color="text.secondary"></Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Link>
      </div>
    </>
  );
};

export default SearchCarouselCard;
