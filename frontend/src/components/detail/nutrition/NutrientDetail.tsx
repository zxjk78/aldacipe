// react core

// API

// external module

// external component

// custom component
import NutrientDetailItem from './NutrientDetailItem';
// css, interface(type)
import classes from './NutrientDetail.module.scss';
import { Nutrient } from '../../../util/interface';
import { categorializeNutrient } from '../../../util/fuctions';
const NutrientDetail = (props: { nutrient: Nutrient; close: () => void }) => {
  const categorializedNutrients = categorializeNutrient(props.nutrient);
  const handleDetailClose = () => {
    props.close();
  };
  return (
    <>
      <div className={classes.wrapper}>
        <div className={classes.container}>
          <div className={classes.header}>
            영양소 상세정보 <span onClick={handleDetailClose}>닫기</span>
          </div>
          <div className={classes.main}>
            {categorializedNutrients.map((item) => (
              <div>
                <NutrientDetailItem itemList={item} />
              </div>
            ))}
          </div>
          <div className={classes.footer}></div>
        </div>
      </div>
    </>
  );
};
export default NutrientDetail;
