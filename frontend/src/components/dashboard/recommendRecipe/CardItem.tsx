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
          <Card sx={{ minWidth: 200, maxWidth: 200, minHeight: '200px' }}>
            <CardActionArea>
              <RecipeImgContainer
                src={`${API_URL}image?path=${
                  props.card.image || props.card.image
                }`}
                alt="카드이미지"
                height="200px"
                width="100%"
              />

              <CardContent sx={{ minHeight: '100px' }}>
                <Typography gutterBottom variant="subtitle1" component="div">
                  {props.card.name.length > 22
                    ? props.card.name.substring(0, 20) + '...'
                    : props.card.name}
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
