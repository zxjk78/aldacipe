import React, { useEffect, useState } from 'react';
import { ingredient } from './interface';
import Checkbox from '@mui/material/Checkbox';

import classes from './RefrigeratorListItem.module.scss';
import { ingredientCategoryDictionary } from '../../util/data';
import imageArr from '../../assets/ingredients';

// 부모: RefrigeratorList
export default function RefrigeratorListItem(props: { item: ingredient }) {
  return (
    <div className={classes.wrapper}>
      <img
        src={imageArr[ingredientCategoryDictionary[props.item.smallCategory]]}
        width={'30px'}
        height={'30px'}
        alt="재료"
      />
      <div>{props.item.name}</div>
    </div>
  );
}
