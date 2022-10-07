// react core
import { useSelector, useDispatch } from 'react-redux';

// API

// external module

// external component
import Checkbox from '@mui/material/Checkbox';

import Tooltip from '@mui/material/Tooltip';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
// custom component
import SmallCategoryImg from '../UI/SmallCategoryImg';
// redux
import { refrigeratorActions } from '../../redux/slice/refrigerator';
// css, interface(type)
import classes from './MyIngredientListItem.module.scss';
import { ingredient } from './interface';
import React from 'react';
// 부모: myIngredientList
const MyIngredientListItem = (props: { ingredient: ingredient }) => {
  const dispatch = useDispatch();
  const isCook = useSelector((state: any) => state.refrigerator.isCook);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      dispatch(refrigeratorActions.addIngredients(props.ingredient));
    } else {
      dispatch(refrigeratorActions.removeIngredients(props.ingredient));
    }
  };
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
                <SmallCategoryImg
                  smallCategory={props.ingredient.smallCategory}
                  width={'40px'}
                  height={'40px'}
                />
                <div>{props.ingredient.name}</div>
              </div>
              <div className={classes.right}>
                <div>{props.ingredient.weight} g</div>
                {isCook && <Checkbox onChange={handleChange} />}
              </div>
            </div>
          </div>
        </div>
      </Tooltip>
    </>
  );
};
export default MyIngredientListItem;
