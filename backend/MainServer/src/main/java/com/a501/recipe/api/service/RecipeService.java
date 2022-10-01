package com.a501.recipe.api.service;

import com.a501.recipe.aop.exception.RecipeNotFoundException;
import com.a501.recipe.aop.exception.RecipeRelationalDataNotFoundException;
import com.a501.recipe.api.domain.entity.*;
import com.a501.recipe.api.dto.evaluation.EvaluationDto;
import com.a501.recipe.api.dto.evaluation.UserEvaluationInfoDto;
import com.a501.recipe.api.dto.ingredient.RecipeIngredientDto;
import com.a501.recipe.api.dto.ingredient.RefrigeratorIngredientDto;
import com.a501.recipe.api.dto.nutrient.RecipeNutrientDto;
import com.a501.recipe.api.dto.recipe.RecipeAndFoodSearchResponseDto;
import com.a501.recipe.api.dto.recipe.RecipeDetailPageResponseDto;
import com.a501.recipe.api.dto.recipe.RecipeDto;
import com.a501.recipe.api.dto.recipe.RecipeThumbNailResponseDto;
import com.a501.recipe.api.repository.EvaluationRepository;
import com.a501.recipe.api.repository.IngredientRepository;
import com.a501.recipe.api.repository.RecipeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class RecipeService {

    private final RecipeRepository recipeRepository;
    private final IngredientRepository ingredientRepository;
    private final EvaluationRepository evaluationRepository;
    public List<RecipeThumbNailResponseDto> getPopularRecipeList() {

        // make random id list -> 24시간 동안 가장 평점이 좋은 레시피 쿼리 제작
        Set<Long> idSet = new HashSet<>();
        Long maxId = 1000l;
        while(idSet.size()<10) {
            idSet.add(((int) (Math.random() * 1000) % maxId) + 1);
        }
        List<Long> idList = new ArrayList<>();
        for(Long id : idSet){
            idList.add(id);
        }

        // search recipes by id list
        return recipeRepository.searchRecipeByIdList(idList).stream()
                .map(r -> new RecipeThumbNailResponseDto(r))
                .collect(Collectors.toList());
    }

    public List<RecipeThumbNailResponseDto> getCookableRecipeList() {

        // make random id list -> 로그인 유저의 냉장고 식재료 리스트가 전부 포함된 요리 쿼리 제작
        Set<Long> idSet = new HashSet<>();
        Long maxId = 1000l;
        while(idSet.size()<10) {
            idSet.add(((int) (Math.random() * 1000) % maxId) + 1);
        }
        List<Long> idList = new ArrayList<>();
        for(Long id : idSet){
            idList.add(id);
        }

        // search recipes by id list
        return recipeRepository.searchRecipeByIdList(idList).stream()
                .map(r -> new RecipeThumbNailResponseDto(r))
                .collect(Collectors.toList());
    }

    public List<RecipeThumbNailResponseDto> getLikableRecipeList() {

        // make random id list -> CF 알고리즘 레시피 id 리스트 결과로 대체
        Set<Long> idSet = new HashSet<>();
        Long maxId = 1000l;
        while(idSet.size()<10) {
            idSet.add(((int) (Math.random() * 1000) % maxId) + 1);
        }
        List<Long> idList = new ArrayList<>();
        for(Long id : idSet){
            idList.add(id);
        }

        // search recipes by id list
        return recipeRepository.searchRecipeByIdList(idList).stream()
                .map(r -> new RecipeThumbNailResponseDto(r))
                .collect(Collectors.toList());
    }

    public RecipeDetailPageResponseDto getTestRecipe(Long id, User loginUser) {
        // n+1 -> 쿼리 2방으로 줄임
        Recipe recipeWithNutrientAndManual = recipeRepository.searchRecipeWithNutrientAndManualById(id)
                .orElseThrow(RecipeNotFoundException::new);
        List<RecipeIngredientDto> ingredientList = ingredientRepository.searchIngredientByRecipe(recipeWithNutrientAndManual)
                .orElseThrow(RecipeRelationalDataNotFoundException::new);
        // 평가
        Evaluation e = evaluationRepository.searchByUserAndRecipe(loginUser,recipeWithNutrientAndManual)
                .orElse(null);
        UserEvaluationInfoDto evalInfo = new UserEvaluationInfoDto(e==null?false:true,e==null?0:e.getScore());
        List<EvaluationDto> evaluationList = evaluationRepository.searchAllByRecipe(recipeWithNutrientAndManual)
                .orElseThrow(RecipeRelationalDataNotFoundException::new);
        // 나에게 있는 재료 리스트 구하기
        ArrayList<Long> ingList = new ArrayList<>();
        for(RecipeIngredientDto ri : ingredientList){
            ingList.add(ri.getId());
        }
        List<RefrigeratorIngredientDto> myIngredientList = ingredientRepository.searchRecipeIngredientUserHas(loginUser, ingList)
                .orElseThrow(RecipeRelationalDataNotFoundException::new);
        return new RecipeDetailPageResponseDto(recipeWithNutrientAndManual, ingredientList, evalInfo, evaluationList, myIngredientList);
    }

    public List<RecipeAndFoodSearchResponseDto> searchRecipeAndFoodByNameAndIngredient(String keyword, List<Long> ingredientIdList, boolean withFood) {
        List<Recipe> candidateList = recipeRepository.searchByRecipeByNameLikeWithIngredient(keyword)
                .orElseThrow(RecipeNotFoundException::new);

        Set<Long> ingSet = new HashSet<>(ingredientIdList);
        List<RecipeAndFoodSearchResponseDto> res = new ArrayList<>();
        for(Recipe r : candidateList) {
            int cnt = 0;
            for (Long ingId : ingSet){
                boolean isExist = false;
                for(RecipeIngredient ri : r.getRecipeIngredients()) {
                    if(ri.getIngredient().getId().equals(ingId)) {
                        isExist = true;
                        break;
                    }
                }
                if(isExist) cnt++;
            }
            if(ingSet.size()==cnt) res.add(new RecipeAndFoodSearchResponseDto(r));
        }

        if(withFood) {
            List<RecipeAndFoodSearchResponseDto> foodList = recipeRepository.searchAllFoodByNameLike(keyword);
            res.addAll(foodList);
        }

        return res;
    }

    public RecipeNutrientDto getRecipeNutrient(Long id) {
        Recipe r = recipeRepository.searchRecipeWithNutrientById(id)
                .orElseThrow(RecipeNotFoundException::new);
        return new RecipeNutrientDto(r.getWeight(), r.getNutrient());
    }
}
