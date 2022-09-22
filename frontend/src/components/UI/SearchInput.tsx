import React, { useState, useRef } from 'react';
import { searchRecipeByKeyword, searchIngredient } from '../../api/search';
import SearchIcon from '@mui/icons-material/Search';
import styled from '@emotion/styled';

// css
import classes from './SearchInput.module.scss';

const MySearchIcon = styled(SearchIcon)`
  color: #5d5d5d;
`;

// 물음표 사용해서 있으면 boolean true, 없으면 undefined로
const SearchInput: React.FC<{
  isNavbar?: boolean;
  isMypage?: boolean;
  placeholder?: string;
}> = (props) => {
  interface SearchRecipeResult {
    recipe: string[];
  }
  interface myPageIngredient {
    ingredient: string[];
  }

  const [briefVisible, setBriefVisible] = useState(false);
  const [navSearchResult, setNavSearchResult] = useState<
    SearchRecipeResult | undefined
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
      const data: SearchRecipeResult | undefined = await searchRecipeByKeyword(
        keyword
      );
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
          <div className={classes.searchContainer}>
            <span>
              <MySearchIcon />
            </span>

            <input
              type="text"
              placeholder={props?.placeholder || '요리 이름 검색'}
              onChange={keywordChangeHandler}
              ref={searchRef}
            />
          </div>
          {briefVisible && props.isNavbar ? (
            <div className={classes.searchBriefResult}>
              <div className={classes.recipe}>
                <div className={`${classes.category} ${classes.recipe}`}>
                  요리
                </div>
                <div className={classes.searchResult}>
                  {navSearchResult?.recipe}요리 부분
                </div>
              </div>
            </div>
          ) : briefVisible && props.isMypage ? (
            <div className={classes.searchBriefResult}>
              {myPageSearchResult?.ingredient}
            </div>
          ) : (
            <></>
          )}
        </form>
      </div>
    </>
  );
};

export default SearchInput;
