// custom component
import CuisineStep from './CuisineStep';
// css
import classes from './CuisineContainer.module.scss';

const CuisineContainer: React.FC<{ }> = () => {
  const completeCooking = () => {
    //API로 recipeId 보내서 냉장고 재료 소비
  };
  return (
    <>
      <div className={classes.wrapper}>
        <div className={classes.main}>
          <div>
            <CuisineStep
              key={Math.random()}
              step={1}
              description={'돼지고기 먹고싶다'}
            />
          </div>

          <button className={classes.complete} onClick={completeCooking}>
            완료
          </button>
        </div>
      </div>
    </>
  );
};

export default CuisineContainer;
