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
  // const onDragEnd = (result: DropResult) => {
  //   const {source, destination} = result
  //   if (!destination) return

  //   const items = Array.from(list)
  //   const [newOrder] = items.splice(source.index, 1)
  //   items.splice(destination.index, 0, newOrder)

  //   setList(items)
  // }

  return (
    <>
      <div>
        {/* <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="list">
            {(provided) => (
              <div className={classes.list} {...provided.droppableProps} ref={provided.innerRef}>
                {list.map(({id, name}, index) => {
                  return (
                    <Draggable key={id} draggableId={id} index={index}>
                      {(provided, snapshot) => (
                        <div ref={provided.innerRef} 
                        {...provided.draggableProps} 
                        {...provided.dragHandleProps}
                        style={getItemStyle(snapshot.isDragging, provided.draggableProps.style)}
                        >
                          {name}
                        </div>
                      )}
                    </Draggable>
                  )
                })}
              </div>
            )}
          </Droppable>
        </DragDropContext> */}
        {props.item.map((item) => (
          <RefrigeratorListItem
            key={item.id}
            item={item}
            searchIngre={props.searchIngre}
            deleteIngre={props.deleteIngre}
          />
        ))}
      </div>
    </>
  );
}
