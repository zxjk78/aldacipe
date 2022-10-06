// react core

// API

// external module

// external component
import Tooltip from '@mui/material/Tooltip';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
// custom component

// css, interface(type)
import classes from './MyIngredientListItem.module.scss';
import { ingredient } from './interface';
const MyIngredientListItem = (props: { ingredient: ingredient }) => {
  return (
    <>
      <Tooltip
        title={
          <span className={classes.expireDate}>
            <AccessTimeIcon /> <span>{props.ingredient.expirationDate}</span>
          </span>
        }
      >
        <div className={classes.wrapper}>
          <div className={classes.container}>
            <div className={classes.main}>
              <div className={classes.left}>
                {/* <img src="" alt="" /> */}
                <div>{props.ingredient.name}</div>
              </div>
              <div className={classes.right}>
                <div>{props.ingredient.weight} g</div>
              </div>
            </div>
          </div>
        </div>
      </Tooltip>
    </>
  );
};
export default MyIngredientListItem;
