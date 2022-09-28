// react core
import { useState, useEffect } from 'react';
import { Ingredient } from '../../util/interface';
// API
import { fetchMyBlackList, addMyBlackList } from '../../api/myInfo';
// external component
// external
import 'react-toastify/dist/ReactToastify.css';
// custom component
import MyPageSearchInput from './MyPageSearchInput';
import FoodBlackListItem from './FoodBlackListItem';
// css
import classes from './FoodBlackList.module.scss';

export default function FoodBlackList(props: {
  addItemError: () => void;
  addItemDone: () => void;
  removeItemDone: () => void;
}) {
  const [isLoading, setIsLoading] = useState(true);
  const [myBlackList, setMyBlackList] = useState<Ingredient[]>([]);
  useEffect(() => {
    setIsLoading(true);
    (async () => {
      const data = await fetchMyBlackList();
      // console.log(data);
      setMyBlackList(data);
    })();

    setIsLoading(false);
  }, []);

  const addBlacklistHandler = async (code: number) => {
    if (code === -1) {
      // 이미 존재하면 error toastr 사용
      props.addItemError();
    } else {
      // 아니면 서버에서 새로 받아오고 info toastr
      const newBlackList = await fetchMyBlackList();
      setMyBlackList(newBlackList);
      props.addItemDone();
    }
  };
  const removeBlacklistHandler = async () => {
    const newBlackList = await fetchMyBlackList();
    setMyBlackList(newBlackList);
    props.removeItemDone();
  };

  return (
    <>
      {!isLoading && (
        <div className={classes.container}>
          <div className={classes.header}>
            <div>못 먹는 음식 관리</div>
          </div>
          <div className={classes.main}>
            <div>
              식품 검색 및 추가를 통해서, 요리 검색 및 추천 서비스에서 해당
              식품이 들어간 레시피들을 제외할 수 있습니다.
            </div>
            <div className={classes.searchBar}>
              <MyPageSearchInput
                placeholder="재료명 검색"
                addBlacklist={addBlacklistHandler}
              />
            </div>
            <div>
              {myBlackList.map((item) => (
                <FoodBlackListItem
                  key={item.id}
                  item={item}
                  removeItem={removeBlacklistHandler}
                />
              ))}
            </div>
          </div>
          <div className={classes.footer}></div>
        </div>
      )}
    </>
  );
}
