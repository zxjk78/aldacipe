import React, { useState, useRef } from 'react';
import { searchRecipeByKeyword, searchIngredient } from '../../api/search';
import SearchIcon from '@mui/icons-material/Search';
import styled from '@emotion/styled';

// css
import classes from './SearchInput.module.scss';
import { useNavigate } from 'react-router-dom';

const MySearchIcon = styled(SearchIcon)`
  color: #5d5d5d;
`;

// 물음표 사용해서 있으면 boolean true, 없으면 undefined로
const SearchInput: React.FC<{
  isMypage?: boolean;
  isSearch?: boolean;
  placeholder?: string;
}> = (props) => {
  interface RecipeResult {
    recipe: string[];
  }
  interface IngredientResult {
    ingredient: string[];
  }

  const navigate = useNavigate();

  const isNavbar = !(props.isMypage || props.isSearch);
  const [briefVisible, setBriefVisible] = useState(false);

  const [recipeSearchResult, setRecipeSearchResult] = useState<
    RecipeResult | undefined
  >(undefined);
  const [ingredientSearchResult, setIngredientSearchResult] = useState<
    IngredientResult | undefined
  >(undefined);

  const searchRef = useRef<HTMLInputElement>(null);

  const submitHandler = (event: React.FormEvent) => {
    event.preventDefault();
    console.log('검색', isNavbar, props.isMypage, props.isSearch);

    if (isNavbar && searchRef.current?.value) {
      navigate({
        pathname: 'search',
        search: `?keyword=${searchRef.current!.value}`,
      });
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
      const data: RecipeResult | undefined = await searchRecipeByKeyword(
        keyword
      );
      setRecipeSearchResult((prev) => data);
      setBriefVisible(true);
    }
    // 마이페이지의 못먹는 재료 검색이면
    else if (props.isMypage || props.isSearch) {
      const data: IngredientResult | undefined = await searchIngredient(
        keyword
      );
      setIngredientSearchResult((prev) => data);
      setBriefVisible(true);
    }
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
                  {recipeSearchResult?.recipe}요리 부분
                </div>
              </div>
            </div>
          ) : briefVisible && props.isMypage ? (
            <div className={classes.searchBriefResult}>
              {ingredientSearchResult?.ingredient}
            </div>
          ) : briefVisible && props.isSearch ? (
            <div className={classes.searchBriefResult}>
              {ingredientSearchResult?.ingredient}
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
