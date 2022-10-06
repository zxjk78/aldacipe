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
          <div className={classes.header}>D{props.ingredient.Dday}</div>
          <div className={classes.main}>
            <img
              src={
                imageArr[
                  ingredientCategoryDictionary[props.ingredient.smallCategory]
                ]
              }
              width={'50px'}
              height={'45px'}
              alt="재료"
            />
          </div>
          <div className={classes.footer}>
            <div>
              <div>
                <span>
                  {props.ingredient.name.length < 8
                    ? props.ingredient.name
                    : props.ingredient.name.substring(0, 5) + '...'}
                </span>
                <span> {props.ingredient.weight}g</span>
              </div>
            </div>
            <div className={classes.expDate}>
              <AccessTimeIcon fontSize="small" />{' '}
              <span>{props.ingredient.expirationDate.substring(5)}</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default ExpirationListItem;
