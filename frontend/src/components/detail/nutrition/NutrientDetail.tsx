// react core

// API

// external module
// external component
import CloseIcon from '@mui/icons-material/Close';

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
            영양소 상세정보{' '}
            <span onClick={handleDetailClose}>
              <CloseIcon />
            </span>
          </div>
          <div className={classes.main}>
            {categorializedNutrients.map((item, index) => (
              <div className={classes.detailItem} key={item.categoryName}>
                <NutrientDetailItem itemList={item} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
export default NutrientDetail;
