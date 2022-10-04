// react core
import { Link } from 'react-router-dom';
// API
import { API_URL } from '../../api/config/http-config';
// external module

// external component

// custom component
import RecipeImgContainer from './RecipeImgContainer';
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

  return (
    <>
      <div className={classes.container} onClick={moveToDetail}>
        <div className={classes.main}>
          <div className={classes.imgContainer}>
            <RecipeImgContainer
              src={`${API_URL}image?path=${props.recipe.image}`}
              width={'50px'}
              height={'50px'}
              alt="요리"
            />
          </div>
          <div className={classes.title}>{props.recipe.name}</div>
        </div>
      </div>
    </>
  );
};
export default RecipeListItem;
