// react core
import React, { useRef, useState } from 'react';

// API
import { searchRecipeByKeyword2 } from '../../../api/search';

// external module

// external component
import CloseIcon from '@mui/icons-material/Close';
import SearchIcon from '@mui/icons-material/Search';
// custom component
import MealSearchListItem from './MealSearchListItem';

// css, interface(type)
import classes from './MealSearch.module.scss';
import { Meal } from '../../../util/interface';

// 부모: DashboardPage
const MealSearch = (props: { onSearchClose: (isAdded: boolean) => void }) => {
  const [searchLoading, setSearchLoading] = useState(false);
  const [intakeSearchResult, setIntakeSearchResult] = useState<Meal[]>([]);
  const keywordRef = useRef<null | HTMLInputElement>(null);

  const keywordChangeHandler = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const keyword = event.target.value.trim();
    // keyward 이용해서 search 받아서 navBar에 올림. 이거 디바운싱 걸어놓아야 할듯?
    if (keyword.length === 0) {
      return;
    }
    setSearchLoading(true);
    const data = await searchRecipeByKeyword2(keyword);
    setIntakeSearchResult((prev) => data);
    setSearchLoading(false);
  };
  const handleMealSubmit = () => {
    keywordRef.current!.value = '';
    setIntakeSearchResult([]);
    props.onSearchClose(true);
  };

  const handleClose = () => {
    props.onSearchClose(false);
  };
  return (
    <>
      <div className={classes.wrapper}>
        <div className={classes.container}>
          <div className={classes.header}>
            <div>
              음식 검색
              <span onClick={handleClose}>
                <CloseIcon />
              </span>
            </div>
            <input
              type="text"
              placeholder="음식 이름을 입력하세요"
              onChange={keywordChangeHandler}
              ref={keywordRef}
            />
          </div>
          <div className={classes.main}>
            {searchLoading ? (
              <div className={`${classes.searchResult} ${classes.isEmpty}`}>
                <span>
                  <SearchIcon />
                </span>
                검색중...
              </div>
            ) : intakeSearchResult.length > 0 ? (
              <div className={classes.searchResult}>
                {intakeSearchResult.slice(0, 5).map((item) => (
                  <MealSearchListItem
                    key={item.id}
                    meal={item}
                    onDataSubmit={handleMealSubmit}
                  />
                ))}
              </div>
            ) : (
              <div className={`${classes.searchResult} ${classes.isEmpty}`}>
                <span>
                  <SearchIcon />
                </span>
                결과가 없습니다.
              </div>
            )}
          </div>
          <div className={classes.footer}></div>
        </div>
      </div>
    </>
  );
};
export default MealSearch;
