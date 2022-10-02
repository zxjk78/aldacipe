import React, { useEffect, useState } from 'react';
import potImg from '../../assets/pot.png'
import RefrigeratorList from './RefrigeratorList';

import classes from './Refrigerator.module.scss';
import { getRefrigerator } from '../../api/myrefrigerator';
import { Ingredient } from './interface';

export default function Refrigerator(props: {item:Ingredient[]}) {

  return (
    <>
      <div className={classes.container}>
        <img className={classes.img} src={potImg} alt="potImg" />
        <div className={classes.itemList}>
          <RefrigeratorList item={props.item}/>
        </div>
      </div>
    </>
  );
}
