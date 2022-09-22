// css
import classes from './SearchResultListItem.module.scss';
import { Ingredient } from './interface';
import AddIcon from '@mui/icons-material/Add';
export default function SearchResultListItem(props: {
  item: Ingredient;
  addItem: (id: Ingredient) => void;
}) {
  const addIngredientHandler = () => {
    props.addItem({ id: props.item.id, name: props.item.name });
  };
  return (
    <>
      <div className={classes.container}>
        <div className={classes.imgContainer}>
          <img src="" alt="재료사진" />
        </div>
        <div className={classes.name}>{props.item.name}</div>
        <div className={classes.plus} onClick={addIngredientHandler}>
          <AddIcon />
        </div>
      </div>
    </>
  );
}
