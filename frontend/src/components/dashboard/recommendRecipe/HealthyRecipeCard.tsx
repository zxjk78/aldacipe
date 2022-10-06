import { useState, FormEvent, ChangeEvent } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { Link } from 'react-router-dom';
import Rating from '@mui/material/Rating';
// css, interfacde
import classes from './HealthyRecipeCard.module.scss';
import { CardHealthyRecipe } from '../../../util/interface';
import { API_URL } from '../../../api/config/http-config';

const HealthyRecipeCard = (props: { card: CardHealthyRecipe }) => {
  return (
    <>
      <div className={classes.card}>
        
        <Link to={`/detail/${props.card.id}`}>
          <Card sx={{ maxWidth: 305, minHeight: 300, maxHeight: 300 }}>
            <CardActionArea>
              <CardMedia
                component="img"
                height="150"
                image={`${API_URL}image?path=${props.card.imgURL}`}
                // image={`${API_URL}image?path=${props.card.image}`}
                alt="green iguana"
              />
              <div className={classes.healthy_recipe_info}>
                {/* <Typography gutterBottom variant="h5" component="div"> */}
                  <span className={classes.middle_text}>
                  {props.card.name.length<22?props.card.name:props.card.name.substring(0,22)+"⋯"}
                  </span>
                {/* </Typography> */}
               
                <div className={classes.feature_container}>
                {props.card.features && props.card.features.map((feature)=>{
                  return <span className={classes.feature_tag}>{feature}</span>
                })}
                </div>
              </div>

            </CardActionArea>
          </Card>
        </Link>

      </div>
    </>
  );
};

export default HealthyRecipeCard;
