import React, { useState, useRef } from 'react';
import { searchKeyword, searchIngredient } from '../../api/search';
import SearchIcon from '@mui/icons-material/Search';

// css
import classes from './SearchInput.module.scss';

// 물음표 사용해서 있으면 boolean true, 없으면 undefined로
const SearchInput: React.FC<{
  isNavbar?: boolean;
  isMypage?: boolean;
}> = (props) => {
  type SearchResult = { recipe: string[]; ingredient: string[] };
  type myPageIngredient = { ingredient: string[] };

  const [briefVisible, setBriefVisible] = useState(false);
  const [navSearchResult, setNavSearchResult] = useState<
    SearchResult | undefined
  >(undefined);
  const [myPageSearchResult, setMyPageSearchResult] = useState<
    myPageIngredient | undefined
  >(undefined);
  const searchRef = useRef<HTMLInputElement>(null);

  const submitHandler = (event: React.FormEvent) => {
    event.preventDefault();
  };

  const keywordChangeHandler = async () => {
    const keyword = searchRef.current!.value;
    // keyward 이용해서 search 받아서 navBar에 올림
    if (keyword.length === 0) {
      setBriefVisible(false);
      return;
    }
    // 인풋의 키워드 변화가
    //네비게이션 바의 검색에서면
    if (props.isNavbar) {
      const data: SearchResult | undefined = await searchKeyword(keyword);
      setNavSearchResult((prev) => data);
      setBriefVisible(true);
    }
    // 마이페이지의 못먹는 재료 검색이면
    else if (props.isMypage) {
      const data: myPageIngredient | undefined = await searchIngredient(
        keyword
      );
      setMyPageSearchResult((prev) => data);
      setBriefVisible(true);
    }
  };

  return (
    <>
      <div className="wrapper">
        <form onSubmit={submitHandler}>
          <SearchIcon />

          <input
            type="text"
            placeholder="Search"
            onChange={keywordChangeHandler}
            ref={searchRef}
          />
        </form>
      </div>
      {briefVisible && props.isNavbar ? (
        <div className={classes.searchBriefResult}>
          <div className={classes.recipe}>
            <h2>요리</h2>
            {navSearchResult?.recipe}
          </div>
          <div className={classes.ingredient}>
            <h2>재료</h2>
            {navSearchResult?.ingredient}
          </div>
        </div>
      ) : briefVisible && props.isMypage ? (
        <div className={classes.searchBriefResult}>
          {myPageSearchResult?.ingredient}
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default SearchInput;
