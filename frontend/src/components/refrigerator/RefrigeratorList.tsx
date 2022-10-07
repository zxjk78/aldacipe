import { ingredient } from './interface';

import classes from './RefrigeratorList.module.scss';
import RefrigeratorListItem from './RefrigeratorListItem';

// 리스트 담는 컴포넌트
// 부모: Refrigerator.tsx
export default function RefrigeratorList(props: { item: ingredient[] }) {
  return (
    <>
      <div className={classes.container}>
        {props.item.map((item) => (
          <RefrigeratorListItem key={item.id} item={item} />
        ))}
      </div>
    </>
  );
}
