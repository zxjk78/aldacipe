// react core
import { Link } from 'react-router-dom';
// API
import { API_URL } from '../../api/config/http-config';
// external module

// external component

// custom component

// css, interface(type)
import classes from './RecipeListItem.module.scss';
import { Recipe } from '../../util/interface';
const RecipeListItem = (props: {
  recipe: Recipe;
  moveToDetail: (id: number) => void;
}) => {
  const moveToDetail = () => {
    props.moveToDetail(props.recipe.id);
  };

  // 내일 이미지 에러 관련해서 물어보기, 권한 없음으로 나오는데
  const errorHandler = () => {
    return;
  };
  return (
    <>
      <div className={classes.container} onClick={moveToDetail}>
        <div className={classes.main}>
          <div className={classes.imgContainer}>
            <img
              src={`${API_URL}image/${props.recipe.image}`}
              alt="레시피이미지"
              onError={errorHandler}
            />
          </div>
          <div className={classes.title}>{props.recipe.name}</div>
        </div>
      </div>
    </>
  );
};
export default RecipeListItem;
