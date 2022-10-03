// react core

// API

// external module

// external component

// custom component

// css, interface(type)
import classes from './NutrientDetailItem.module.scss';
import { NutObj } from '../../../util/interface';
import { nutritionDictionary } from '../../../util/data';
const NutrientDetailItem = (props: {
  itemList: { categoryName: string; itemArr: NutObj[] };
}) => {
  return (
    <>
      <div className={classes.wrapper}>
        <div className={classes.container}>
          <div className={classes.header}>{props.itemList.categoryName}</div>
          <div className={classes.main}>
            {props.itemList.itemArr.map((item) => (
              <div className={classes.item} key={item.name}>
                <div>{nutritionDictionary[item.name].name}</div>
                <div>
                  {item.value.toFixed(1)} {item.scale}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
export default NutrientDetailItem;
