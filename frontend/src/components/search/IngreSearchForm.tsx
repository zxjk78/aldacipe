import React from 'react';
import { ChangeEvent, useState } from 'react';
import { debounce } from 'lodash';

import ChipsArray from './ChipsArray';

import SearchResultList from './SearchResultList';
// api
import { searchIngredient } from '../../api/search';
// css, interface
import classes from './IngreSearchForm.module.scss';
import { Ingredient } from './interface';
export default function IngreSearchForm(props: {}) {
  const [ingredientArr, setIngredientArr] = useState<Ingredient[]>([]);
  const [searchResult, setSearchResult] = useState<any>(null);
  const [searchListVisible, setSearchListVisible] = useState(false);

  // lodash의 debounce는 선언은 처음에하고 나중에 사용하는 형식
  const searchDebounce = debounce(async (keyword) => {
    const data = await searchIngredient(keyword);
    return data;
  }, 500);
  const searchIngreHandler = (event: React.FocusEvent<HTMLInputElement>) => {
    const ingredient = event.target.value;
    if (ingredient.trim().length === 0) {
      setSearchListVisible(false);
      return;
    }

    const data = searchDebounce(event.target.value);
    setSearchResult(data);
    setSearchListVisible(true);
  };
  const addIngreHandler = (item: Ingredient) => {
    setIngredientArr((prev) => [...prev, item]);
  };
  return (
    <>
      <input
        type="text"
        placeholder="검색할 재료를 입력하세요"
        onChange={searchIngreHandler}
        className={classes.searchInput}
      />
      {searchResult ? (
        <div className={classes.searchResult}>
          <SearchResultList
            ingreList={searchResult}
            addItem={addIngreHandler}
          />
        </div>
      ) : searchListVisible ? (
        <div className={classes.searchResult}>검색 결과가 없습니다.</div>
      ) : (
        ''
      )}

      {/* <ChipsArray ingredients={ingredientArr} /> */}
    </>
  );
}
