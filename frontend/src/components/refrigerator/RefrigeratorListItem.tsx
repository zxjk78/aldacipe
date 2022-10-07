import React from 'react';
import { ingredient } from './interface';

import SmallCategoryImg from '../UI/SmallCategoryImg';

import classes from './RefrigeratorListItem.module.scss';

// 부모: RefrigeratorList
export default function RefrigeratorListItem(props: { item: ingredient }) {
  return (
    <div className={classes.wrapper}>
      <SmallCategoryImg
        smallCategory={props.item.smallCategory}
        width="50px"
        height="40px"
      />

      <div>{props.item.name}</div>
    </div>
  );
}
