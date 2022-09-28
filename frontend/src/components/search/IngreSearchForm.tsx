import React from 'react';
import { ChangeEvent, useState } from 'react';
import { debounce } from 'lodash';

import ChipsArray from './ChipsArray';

import SearchResultList from './SearchResultList';
// api
import { searchIngredient } from '../../api/search';
// css, interface
import classes from './IngreSearchForm.module.scss';
import { Ingredient } from '../../util/interface';
export default function IngreSearchForm(props: {
  addItem: (newIngredient: Ingredient) => void;
}) {
  const [selectedIngreArr, setSelectedIngreArr] = useState<Ingredient[]>([]);
  const [searchResult, setSearchResult] = useState<Ingredient[] | null>(null);
  const [searchListVisible, setSearchListVisible] = useState(false);

  // lodash의 debounce는 선언은 처음에하고 나중에 사용하는 형식
  const searchDebounce = debounce(async (keyword) => {
    const data = await searchIngredient(keyword);
    // console.log(data);

    setSearchResult(data);
    setSearchListVisible(true);
    return data;
  }, 500);
  const searchIngreHandler = (event: React.FocusEvent<HTMLInputElement>) => {
    const ingredient = event.target.value;
    if (ingredient.trim().length === 0) {
      setSearchListVisible(false);
      return;
    }

    searchDebounce(event.target.value);
  };
  const addIngreHandler = (ingreId: number) => {
    const newItem = searchResult!.filter((item) => +item.id === ingreId)[0];

    props.addItem(newItem);
  };
  const removeIngredient = (ingreId: number) => {
    setSelectedIngreArr((prev) => prev.filter((item) => +item.id !== ingreId));
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
      ) : !searchListVisible ? (
        <div className={classes.searchResult}>검색 결과가 없습니다.</div>
      ) : (
        ''
      )}

      <ChipsArray
        ingredients={selectedIngreArr}
        deleteIngre={removeIngredient}
      />
    </>
  );
}
