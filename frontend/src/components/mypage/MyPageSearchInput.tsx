// react core
import React, { useState, useRef } from 'react';

// API
import { addMyBlackList } from '../../api/myInfo';
import { searchIngredient } from '../../api/search';
// external module

// external component

// custom component
import SearchIcon from '@mui/icons-material/Search';

import IngredientListItem from '../UI/IngredientListItem';
import styled from '@emotion/styled';

// css, interface(type)
import classes from './MyPageSearchInput.module.scss';
import { Recipe, Ingredient } from '../../util/interface';

const MySearchIcon = styled(SearchIcon)`
  color: #5d5d5d;
`;

const MyPageSearchInput = (props: {
  placeholder?: string;
  addBlacklist: (code: number) => void;
}) => {
  const [briefVisible, setBriefVisible] = useState(false);
  const [ingredientSearchResult, setIngredientSearchResult] = useState<
    Ingredient[]
  >([]);
  const searchRef = useRef<HTMLInputElement>(null);

  const submitHandler = (event: React.FormEvent) => {
    event.preventDefault();
    // console.log('검색', isNavbar, props.isMypage, props.isSearch);
  };
  const keywordChangeHandler = async () => {
    const keyword = searchRef.current!.value;
    // keyward 이용해서 search 받아서 navBar에 올림
    if (keyword.length === 0) {
      setBriefVisible(false);
      return;
    }

    // 마이페이지의 못먹는 재료 검색이면
    const data = await searchIngredient(keyword);
    setIngredientSearchResult((prev) => data);
    setBriefVisible(true);
  };
  const enterHandler = async (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      await keywordChangeHandler();
    }
  };
  // 재료 블랙리스트 추가하는 함수
  const addBlackListHandler = async (ingredientId: number) => {
    const data = await addMyBlackList(ingredientId);
    if (data === 1016) {
      // 이미 존재하면 -1 보내서 toastr 사용하도록
      props.addBlacklist(-1);
    } else {
      // 아니면 그냥 아무값 : 재료 id값 보내고 닫기
      props.addBlacklist(ingredientId);
      setBriefVisible(false);
    }
  };
  return (
    <>
      <div className={classes.wrapper}>
        <form onSubmit={submitHandler}>
          <div className={classes.searchContainer}>
            <span>
              <MySearchIcon />
            </span>

            <input
              type="text"
              placeholder={props?.placeholder || '요리 이름 검색'}
              onChange={keywordChangeHandler}
              onKeyDown={enterHandler}
              ref={searchRef}
            />
          </div>
          {briefVisible && (
            <div className={classes.searchBriefResult}>
              {ingredientSearchResult.map((item) => (
                <IngredientListItem
                  key={item.id}
                  ingredient={item}
                  addBlackList={addBlackListHandler}
                />
              ))}
            </div>
          )}
        </form>
      </div>
    </>
  );
};
export default MyPageSearchInput;
