import React, { useEffect, useState } from 'react';
import potImg from '../../assets/pot.png';
import RefrigeratorList from './RefrigeratorList';
// import { useSelector } from 'react-redux';
import classes from './Refrigerator.module.scss';
import { getRefrigerator } from '../../api/myrefrigerator';
import { ingredient } from './interface';

// 부모:
export default function Refrigerator(props: {
  selectedItemList: ingredient[];
}) {
  // const selectedIngredientList = useSelector(
  //   (state: any) => state.refrigerator.cookingIngredientList
  // );
  // console.log(selectedIngredientList);

  return (
    <>
      <div className={classes.container}>
        {props.selectedItemList.length === 0 ? (
          <div className={classes.empty}>재료를 선택해 주세요.</div>
        ) : (
          <div className={classes.itemList}>
            <RefrigeratorList item={props.selectedItemList} />
          </div>
        )}
      </div>
    </>
  );
}
