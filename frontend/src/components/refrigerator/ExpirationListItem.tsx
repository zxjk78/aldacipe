// react core

// API

// external module

// external component
import AccessTimeIcon from '@mui/icons-material/AccessTime';
// custom component
import { ingredientCategoryDictionary } from '../../util/data';
import imageArr from '../../assets/ingredients';
// css, interface(type)
import classes from './ExpirationListItem.module.scss';
import { ingredient } from './interface';

const ExpirationListItem = (props: { ingredient: any }) => {
  return (
    <>
      <div className={classes.wrapper}>
        <div className={classes.container}>
          <div className={classes.header}>D-{props.ingredient.Dday}</div>
          <div className={classes.main}>
            <img
              src={
                imageArr[
                  ingredientCategoryDictionary[props.ingredient.smallCategory]
                ]
              }
              width={'40px'}
              height={'40px'}
              alt="재료"
            />
            <div>
              <div className={classes.ingreInfo}>
                <div>{props.ingredient.name}</div>
                <div>{props.ingredient.weight}g</div>
              </div>
              <div className={classes.footer}>
                <AccessTimeIcon /> <div>{props.ingredient.expirationDate}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default ExpirationListItem;
