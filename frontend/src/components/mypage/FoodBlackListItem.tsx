// react core

// API

// external module

// external component

// custom component

// css, interface(type)
import classes from './FoodBlackListItem.module.scss';
import { Ingredient } from '../../util/interface';
import { removeMyBlackList } from '../../api/myInfo';
const FoodBlackListItem = (props: {
  item: Ingredient;
  removeItem: () => void;
}) => {
  const removeBlacklist = async () => {
    const success = await removeMyBlackList(+props.item.id);

    if (success) {
      props.removeItem();
    }
  };
  return (
    <>
      <div className={classes.container}>
        <div className={classes.main}>
          <div>{props.item.name}</div>
          <div onClick={removeBlacklist}>삭제</div>
          {/* <div>{props.item.largeCategory}</div>
          <div>{props.item.smallCategory}</div> */}
        </div>
      </div>
    </>
  );
};
export default FoodBlackListItem;
