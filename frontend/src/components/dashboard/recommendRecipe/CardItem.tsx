import { useState, FormEvent, ChangeEvent } from 'react';
import { Link } from 'react-router-dom';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

// custom component

import RecipeImgContainer from '../../UI/RecipeImgContainer';

// css, interfacde
import classes from './CardItem.module.scss';
import { SearchRecipe } from '../../../util/interface';
import { API_URL } from '../../../api/config/http-config';

const CardItem = (props: { card: SearchRecipe }) => {
  // const linkDetail = (id: number) => {
  //   <Link></Link>
  // }

  return (
    <>
      <div className={classes.card}>
        <Link to={`/detail/${props.card.id}`}>
          <Card sx={{ minWidth: 200, maxWidth: 500}}>
            <CardActionArea>
              <RecipeImgContainer
                src={`${API_URL}image?path=${
                  props.card.image || props.card.image
                }`}
                alt="카드이미지"
                height="200px"
                width="100%"
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

export default CardItem;
