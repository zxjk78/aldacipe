// react core

import React, { useRef, useState } from 'react';
// API
import { addUserIntake } from '../../../api/dashboard';
// external module

// external component

// custom component

// css, interface(type)
import classes from './MealSearchListItem.module.scss';
import { Meal } from '../../../util/interface';
import moment from 'moment';
export default function MealSearchListItem(props: {
  meal: Meal;
  onDataSubmit: () => void;
}) {
  const [isSelected, setIsSelected] = useState<null | boolean>(null);
  const [isAmountEntered, setIsAmountEntered] = useState(false);
  const divRefs = useRef<HTMLDivElement[] | null[]>([]);
  const amountRef = useRef<HTMLInputElement | null>(null);

  const handleAdd = async () => {
    // console.log('데이터 제출');

    const amount = +amountRef.current!.value;
    if (amount === 0) return;
    const data = {
      intakeAmount: amount,
      intakeDate: moment(new Date()).format('YYYY-MM-DD'),
      intakeTargetId: props.meal.id,
      intakeType: props.meal.type,
    };
    const success = await addUserIntake(data);

    if (success) {
      props.onDataSubmit();
    }
  };
  const handleEnterAmount = () => {
    // console.log('섭취량 입력창으로 전환');

    for (let index = 0; index < divRefs.current.length; index++) {
      divRefs.current[index]?.classList.add(classes[`selected${index}`]);
    }

    setIsSelected(true);
  };
  const handleCanSubmit = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (+event.target.value > 0) {
      setIsAmountEntered(true);
    } else {
      setIsAmountEntered(false);
    }
  };
  return (
    <>
      <div
        className={classes.wrapper}
        ref={(ele) => {
          divRefs.current[0] = ele;
        }}
      >
        <div className={classes.container}>
          <div className={classes.left}>
            <div>
              <img
                src="https://img.freepik.com/free-photo/cheesy-tokbokki-korean-traditional-food-on-black-board-background-lunch-dish_1150-42993.jpg?size=626&ext=jpg"
                alt="그림"
              />
            </div>
          </div>
          <div className={classes.middle}>
            <div className={classes.foodInfo}>
              <div
                className={classes.foodName}
                ref={(ele) => {
                  divRefs.current[1] = ele;
                }}
              >
                {props.meal.name}
              </div>
              <div className={classes.amountContainer}>
                <div
                  className={`${classes.amount}`}
                  ref={(ele) => {
                    divRefs.current[2] = ele;
                  }}
                >
                  <label htmlFor="amount">섭취량(g)</label>
                  <input
                    type="number"
                    id="amount"
                    onChange={handleCanSubmit}
                    ref={amountRef}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className={classes.right}>
            <button
              type="button"
              className={classes.add}
              onClick={isSelected ? handleAdd : handleEnterAmount}
              disabled={isSelected && !isAmountEntered ? true : false}
            >
              추가
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
