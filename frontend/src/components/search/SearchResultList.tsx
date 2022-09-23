// custom component
import SearchResultListItem from './SearchResultListItem';
// css, interface
import classes from './SearchResultList.module.scss';
import { Ingredient } from './interface';
export default function SearchResultList(props: {
  resultArr: Ingredient[];
  addItem: (id: Ingredient) => void;
}) {
  const addItemHandler = (item: Ingredient) => {
    props.addItem(item);
  };
  return (
    <>
      <div className={classes.wrapper}>
        <div className={classes.container}>
          {props.resultArr.map((item) => (
            <SearchResultListItem
              key={item.id}
              item={item}
              addItem={addItemHandler}
            />
          ))}
        </div>
      </div>
    </>
  );
}
