// custom component
// css
import classes from './CuisineStep.module.scss';

const CuisineStep: React.FC<{ step: number; description: string }> = (
  props
) => {
  return (
    <>
      <div className={classes.main}>
        <img src="" alt="요리법" />
        <div>
          <div className={classes.stepNumber}>{props.step}</div>
          <div className={classes.description}>{props.description}</div>
        </div>
      </div>
    </>
  );
};

export default CuisineStep;
