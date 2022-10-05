// react core

// API

// external module

// external component

// custom component
import CardItem from '../dashboard/recommendRecipe/CardItem';
// css, interface(type)
import classes from './RecipeCardContainerLessThanFive.module.scss';
import { CardRecipe } from '../../util/interface';
const RecipeCardContainerLessThanFive = (props: { cardList: CardRecipe[] }) => {
  return (
    <>
      <div className={classes.wrapper}>
        <div className={classes.main}>
          {props.cardList.map((item) => (
            <CardItem key={item.id} card={item} />
          ))}
        </div>
      </div>
    </>
  );
};
export default RecipeCardContainerLessThanFive;
