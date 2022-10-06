import React, { useEffect, useState } from 'react';
import {
  DragDropContext,
  DropResult,
  Droppable,
  Draggable,
} from 'react-beautiful-dnd';
import { getRefrigerator } from '../../api/myrefrigerator';
import { ingredient } from './interface';

import classes from './RefrigeratorList.module.scss';
import RefrigeratorListItem from './RefrigeratorListItem';

// 리스트 담는 컴포넌트
export default function RefrigeratorList(props: {
  item: ingredient[];
  searchIngre: (data: number) => void;
  deleteIngre: (data: number) => void;
}) {
  return (
    <>
      <div className={classes.container}>
        {props.item.map((item) => (
          <RefrigeratorListItem key={item.id} item={item} />
        ))}
      </div>
    </>
  );
}
