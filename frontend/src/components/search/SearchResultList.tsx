import SearchResultListItem from './SearchResultListItem';
import { Ingredient } from '../../util/interface';
export default function SearchResultList(props: {
  ingreList: Ingredient[];
  addItem: (ingredientId: number) => void;
}) {
  const addIngredient = (ingredientId: number) => {
    // console.log(ingredientId);
    props.addItem(ingredientId);
  };
  return (
    <>
      {props.ingreList.map((item) => (
        <div>
          <SearchResultListItem
            key={item.id}
            ingredient={item}
            addItem={addIngredient}
          />
        </div>
      ))}
    </>
  );
}
