import SearchResultListItem from './SearchResultListItem';

export default function SearchResultList(props: {
  ingreList: any[];
  addItem: (item: any) => void;
}) {
  const addIngredient = (event: React.MouseEvent<HTMLDivElement>) => {
    console.log(event.target);
  };
  return (
    <>
      {props.ingreList.map((item) => (
        <div onClick={addIngredient} data-idx={item.id}>
          <SearchResultListItem key={item.id} ingredient={item} />
        </div>
      ))}
    </>
  );
}
