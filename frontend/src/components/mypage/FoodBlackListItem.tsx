// react core

// API
import { removeMyBlackList } from '../../api/myInfo';

// external module

// external component

// custom component

// css, interface(type)
import classes from './FoodBlackListItem.module.scss';
import { Ingredient } from '../../util/interface';
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
          <div>
            <div>{props.item.name}</div>
            <div>{props.item.smallCategory}</div>
          </div>
          <div onClick={removeBlacklist}>삭제</div>
          {/* <div>{props.item.largeCategory}</div> */}
        </div>
      </div>
    </>
  );
};
export default FoodBlackListItem;
