import React, { useState } from 'react';
import { DragDropContext, DropResult, Droppable, Draggable} from 'react-beautiful-dnd';

import classes from './RefrigeratorList.module.scss';

// redux로 관리해야 할듯?
const listItems = [
  {
    id: "1",
    name: "감자"
  },
  {
    id: "2",
    name: "마늘"
  },
  {
    id: "3",
    name: "양파"
  },
  {
    id: "4",
    name: "사과"
  },
  {
    id: "5",
    name: "버섯"
  }
]

const getItemStyle = (isDragging: boolean, draggableStyle: any) => ({
  padding: 10,
  margin: `0 50px 15px 50px`,
  background: isDragging ? "#4a2975" : "white",
  color: isDragging ? 'white' : 'black',
  border: `1px solid black`,
  fontSize: `20px`,
  borderRadius: `5px`,

  ...draggableStyle

})

export default function RefrigeratorList(props: {}) {
  const [list, setList] = useState(listItems)
  const onDragEnd = (result: DropResult) => {
    const {source, destination} = result
    if (!destination) return

    const items = Array.from(list)
    const [newOrder] = items.splice(source.index, 1)
    items.splice(destination.index, 0, newOrder)

    setList(items)
  }

  return (
    <>
      <div>
        <DragDropContext onDragEnd={onDragEnd}>
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
        </DragDropContext>
      </div>
    </>
  );
}
