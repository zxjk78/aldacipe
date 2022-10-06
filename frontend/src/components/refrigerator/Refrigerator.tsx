import React, { useEffect, useState } from 'react';
import potImg from '../../assets/pot.png';
import RefrigeratorList from './RefrigeratorList';
import { useSelector } from 'react-redux';
import classes from './Refrigerator.module.scss';
import { getRefrigerator } from '../../api/myrefrigerator';
import { ingredient } from './interface';

export default function Refrigerator(props: {
  item: ingredient[];
  searchIngre: (data: number) => void;
  deleteIngre: (data: number) => void;
}) {
  const selectedIngredientList = useSelector(
    (state: any) => state.refrigerator.cookingIngredientList
  );
  console.log(selectedIngredientList);

  return (
    <>
      <div className={classes.container}>
        <div className={classes.itemList}>
          <RefrigeratorList item={selectedIngredientList} />
        </div>
      </div>
    </>
  );
}
