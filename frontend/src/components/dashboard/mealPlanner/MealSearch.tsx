// react core

// API

// external module
import CloseIcon from '@mui/icons-material/Close';
// external component

// custom component
import MealPlannerSearchInput from './MealPlannerSearchInput';
// css, interface(type)
import classes from './MealSearch.module.scss';

const MealSearch = (props: { onSearchClose: () => void }) => {
  const handleClose = () => {
    props.onSearchClose();
  };
  return (
    <>
      <div className={classes.wrapper}>
        <div className={classes.container}>
          <div className={classes.header}>
            <div>음식 검색</div>
            <div onClick={handleClose}>
              <CloseIcon />
            </div>
          </div>
          <div className={classes.main}>
            <div>
              <MealPlannerSearchInput
                placeholder="음식 검색"
                onSearchClose={handleClose}
              />
            </div>
          </div>
          <div className={classes.footer}></div>
        </div>
      </div>
    </>
  );
};
export default MealSearch;
