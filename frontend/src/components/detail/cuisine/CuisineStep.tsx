// api

// custom component
import StepImgContainer from '../../UI/StepImgContainer';
// css, interface, etc
import classes from './CuisineStep.module.scss';
import { Manual } from '../../../util/interface';
import { API_URL } from '../../../api/config/http-config';

// 부모 CuisineContainer

const CuisineStep = (props: { step: Manual }) => {
  return (
    <>
      <div className={classes.main}>
        <StepImgContainer
          src={`${API_URL}image?path=${props.step.image}`}
          alt={`요리법${props.step.order}`}
          width={'180px'}
          height={'180px'}
        />
        <div>
          <div className={classes.stepNumber}>{props.step.order}</div>
          <div className={classes.description}>
            {!isNaN(+props.step.instruction[0])
              ? props.step.instruction.substring(3)
              : props.step.instruction}
          </div>
        </div>
      </div>
    </>
  );
};

export default CuisineStep;
