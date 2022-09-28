import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

// api
import { addMyBlackList } from '../../api/myInfo';
// custom components
import { searchRecipeByKeyword, searchIngredient } from '../../api/search';
import SearchIcon from '@mui/icons-material/Search';
import RecipeListItem from './RecipeListItem';
import IngredientListItem from './IngredientListItem';

import styled from '@emotion/styled';
// css, interface
import classes from './SearchInput.module.scss';
import { Recipe_carousel, Ingredient } from '../../util/interface';
const MySearchIcon = styled(SearchIcon)`
  color: #5d5d5d;
`;

// 물음표 사용해서 있으면 boolean true, 없으면 undefined로
const SearchInput: React.FC<{
  isMypage?: boolean;
  isSearch?: boolean;
  placeholder?: string;
}> = (props) => {
  const navigate = useNavigate();

  const isNavbar = !(props.isMypage || props.isSearch);
  const [briefVisible, setBriefVisible] = useState(false);

  const [recipeSearchResult, setRecipeSearchResult] = useState<
    Recipe_carousel[]
  >([]);
  const [ingredientSearchResult, setIngredientSearchResult] = useState<
    Ingredient[]
  >([]);

  const searchRef = useRef<HTMLInputElement>(null);

  const submitHandler = (event: React.FormEvent) => {
    event.preventDefault();
    // console.log('검색', isNavbar, props.isMypage, props.isSearch);

    if (isNavbar && searchRef.current?.value) {
      navigate(
        {
          pathname: 'search',
          search: `?keyword=${searchRef.current!.value}&ingredient=""`,
        },
        { replace: true }
      );
      setBriefVisible(false);
    }
    return;
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
    if (isNavbar) {
      const data = await searchRecipeByKeyword(keyword);
      setRecipeSearchResult((prev) => data);
      setBriefVisible(true);
    }
    // 마이페이지의 못먹는 재료 검색이면
    else if (props.isMypage || props.isSearch) {
      const data = await searchIngredient(keyword);
      setIngredientSearchResult((prev) => data);
      setBriefVisible(true);
    }
  };

  // 클릭한 레시피명으로 이동시키는 함수
  const moveToRecipeDetailHandler = (recipeId: number) => {
    navigate(`detail/${recipeId}`);
    setBriefVisible(false);
  };

  // 재료 블랙리스트 추가하는 함수
  const addBlackListHandler = async (ingredientId: number) => {
    const success = await addMyBlackList(ingredientId);
    console.log(success);

    // if (success) {
    //   document.location.reload();
    // }
  };

  return (
    <>
      <div className="wrapper">
        <form onSubmit={submitHandler}>
          <div className={classes.searchContainer}>
            <span onClick={submitHandler}>
              <MySearchIcon />
            </span>

            <input
              type="text"
              placeholder={props?.placeholder || '요리 이름 검색'}
              onChange={keywordChangeHandler}
              ref={searchRef}
            />
          </div>
          {briefVisible && isNavbar ? (
            <div className={classes.searchBriefResult}>
              <div className={classes.recipe}>
                <div className={`${classes.category} ${classes.recipe}`}>
                  요리
                </div>
                <div className={classes.searchResult}>
                  {recipeSearchResult.slice(0, 5).map((item) => (
                    <RecipeListItem
                      key={item.id}
                      recipe={item}
                      moveToDetail={moveToRecipeDetailHandler}
                    />
                  ))}
                </div>
              </div>
            </div>
          ) : briefVisible && props.isMypage ? (
            <div className={classes.searchBriefResult}>
              {ingredientSearchResult.map((item) => (
                <IngredientListItem
                  key={item.id}
                  ingredient={item}
                  addBlackList={addBlackListHandler}
                />
              ))}
            </div>
          ) : briefVisible && props.isSearch ? (
            <div className={classes.searchBriefResult}>
              {ingredientSearchResult.map((item) => (
                <IngredientListItem key={item.id} ingredient={item} />
              ))}
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
