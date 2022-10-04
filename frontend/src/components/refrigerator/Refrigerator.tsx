import React, { useEffect, useState } from 'react';
import potImg from '../../assets/pot.png'
import RefrigeratorList from './RefrigeratorList';

import classes from './Refrigerator.module.scss';
import { getRefrigerator } from '../../api/myrefrigerator';
import { ingredient } from './interface';

export default function Refrigerator(props: 
  {
    item:ingredient[];
    searchIngre: (data:number) => void;
    deleteIngre: (data:number) => void;
  }
  ) {

  return (
    <>
      <div className={classes.container}>
        <img className={classes.img} src={potImg} alt="potImg" />
        <div className={classes.itemList}>
          <RefrigeratorList 
            item={props.item} 
            searchIngre={props.searchIngre}
            deleteIngre={props.deleteIngre} />
        </div>
      </div>
    </>
  );
}
