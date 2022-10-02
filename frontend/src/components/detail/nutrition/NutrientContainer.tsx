// react core
import { useState } from 'react';

// API

// external module

// external component

// custom component
import NutritionInfo from '../../UI/NutritionInfo';
// css, interface(type)
import classes from './NutrientContainer.module.scss';
import { Nutrient } from '../../../util/interface';
const NutrientContainer = (props: {
  nutrient: Nutrient;
  showDetail: () => void;
}) => {
  const [detail, setDetail] = useState(false);

  const handleOpenDetail = () => {
    setDetail(true);
    props.showDetail();
  };
  return (
    <>
      <div className={classes.wrapper}>
        <div className={classes.container}>
          <div className={classes.main}>
            <div>
              <NutritionInfo
                nutrition={props.nutrient}
                showDetail={handleOpenDetail}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default NutrientContainer;
