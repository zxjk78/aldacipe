import React from 'react';

import classes from './IngredientItem.module.scss';



export default function IngredientItem(props: {
  item:string
}) {
  return (
    <>
      <div className={classes.item}>{props.item}</div>
    </>
  );
}
