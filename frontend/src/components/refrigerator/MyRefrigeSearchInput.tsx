// react core
import React, { useState, useRef } from 'react';

// API
import { searchIngredient } from '../../api/search';
// custom component
import SearchIcon from '@mui/icons-material/Search';
import styled from '@emotion/styled';

// css, interface(type)
import classes from './MyRefrigeSearchInput.module.scss';
import { ingredient } from './interface';
import IngredientList from './IngredientList';
import { addMyRefrigekList } from '../../api/myrefrigerator';

const MySearchIcon = styled(SearchIcon)`
  color: #5d5d5d;
`;

const MyRefrigeSearchInput = (props: {
  placeholder?: string;
  addIngredient: (data:ingredient) => void;
}) => {
  const [briefVisible, setBriefVisible] = useState(false);
  const [ingredientSearchResult, setIngredientSearchResult] = useState<ingredient[]>([]);
  const searchRef = useRef<HTMLInputElement>(null);

  const submitHandler = (event: React.FormEvent) => {
    event.preventDefault();
    // console.log('검색', isNavbar, props.isMypage, props.isSearch);
  };
  const keywordChangeHandler = async () => {
    const keyword = searchRef.current!.value;
    // console.log(keyword);
    
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
                <IngredientList 
                  addRefrigeList={addMyRefrigekList}
                  addIngredient={props.addIngredient}
                  key={item.id}
                  ingredient={item}
                />
              ))}
            </div>
          )}
        </form>
      </div>
    </>
  );
};
export default MyRefrigeSearchInput;
