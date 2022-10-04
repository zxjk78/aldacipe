// api

// custom component
// css, interface, etc
import classes from './CuisineStep.module.scss';
import { Manual } from '../../../util/interface';
import { API_URL } from '../../../api/config/http-config';
const CuisineStep = (props: { step: Manual }) => {
  return (
    <>
      <div className={classes.main}>
        <img
          src={`${API_URL}image?path=${props.step.image}`}
          alt={`요리법${props.step.order}`}
          width={'100px'}
          height={'100px'}
        />
        <div>
          <div className={classes.stepNumber}>{props.step.order}</div>
          <div className={classes.description}>{props.step.instruction}</div>
        </div>
      </div>
    </>
  );
};

export default CuisineStep;
