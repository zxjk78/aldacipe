package com.a501.recipe.api.service;

import com.a501.recipe.aop.exception.FoodNotFoundException;
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
import com.a501.recipe.api.dto.recipe.RecipeThumbNailResponseDto;
import com.a501.recipe.api.repository.EvaluationRepository;
import com.a501.recipe.api.repository.IngredientRepository;
import com.a501.recipe.api.repository.RecipeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestTemplate;

import java.math.BigDecimal;
import java.math.BigInteger;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class RecipeService {

    private final RecipeRepository recipeRepository;
    private final IngredientRepository ingredientRepository;
    private final EvaluationRepository evaluationRepository;

    @Value("${url.server.recommendation}")
    private String RECOMMENDATION_SERVER_URL;

    public List<RecipeThumbNailResponseDto> getRandomRecipeList() {

        // make random id list -> 24시간 동안 가장 평점이 좋은 레시피 쿼리 제작
        Set<Long> idSet = new HashSet<>();
        Long maxId = 1000l;
        while (idSet.size() < 10) {
            idSet.add(((int) (Math.random() * 1000) % maxId) + 1);
        }
        List<Long> idList = new ArrayList<>();
        for (Long id : idSet) {
            idList.add(id);
        }

        // search recipes by id list
        return recipeRepository.searchRecipeByIdList(idList).stream()
                .map(r -> new RecipeThumbNailResponseDto(r))
                .collect(Collectors.toList());
    }


    public List<RecipeThumbNailResponseDto> getPopularRecipeList(int day) {
        Calendar cal = Calendar.getInstance();
        Date today = new Date();
        cal.setTime(today);
        cal.add(Calendar.DATE, -1 * (day-1));

        SimpleDateFormat dtFormat = new SimpleDateFormat("yyyy-MM-dd");
        String fromDateStr = dtFormat.format(cal.getTime());
        LocalDate fromDate = LocalDate.parse(fromDateStr);

        List<Object[]> result = recipeRepository.searchTop20BestRecipeFrom(fromDate);
        return result.stream()
                .map(objects -> new RecipeThumbNailResponseDto(
                        ((BigInteger) objects[0]).longValue()
                        , (String) objects[1]
                        , (String) objects[2]
                        , ((BigDecimal) objects[3]).floatValue()))
                .collect(Collectors.toList());
    }

    public List<RecipeThumbNailResponseDto> getCookableRecipeList(Long userId) {
        RestTemplate restTemplate = new RestTemplate();
        class LikableRecipeRequestDto {
            long user_id;
            public LikableRecipeRequestDto(long user_id) {
                this.user_id = user_id;
            }
        }
        LikableRecipeRequestDto body = new LikableRecipeRequestDto(userId);
        List<Long> idList = restTemplate.postForObject(RECOMMENDATION_SERVER_URL + "/recommend_sgd", body, List.class);
        System.out.println(idList.toString());


        // search recipes by id list
        return recipeRepository.searchRecipeByIdList(idList).stream()
                .map(r -> new RecipeThumbNailResponseDto(r))
                .collect(Collectors.toList());
    }

    public List<RecipeThumbNailResponseDto> getLikableRecipeList(Long userId) {
        RestTemplate restTemplate = new RestTemplate();
        class LikableRecipeRequestDto {
            long user_id;
            public LikableRecipeRequestDto(long user_id) {
                this.user_id = user_id;
            }
        }
        LikableRecipeRequestDto body = new LikableRecipeRequestDto(userId);
        List<Long> idList = restTemplate.postForObject(RECOMMENDATION_SERVER_URL + "/recommend_sgd", body, List.class);
        System.out.println(idList.toString());


        // search recipes by id list
        return recipeRepository.searchRecipeByIdList(idList).stream()
                .map(r -> new RecipeThumbNailResponseDto(r))
                .collect(Collectors.toList());
    }

    public List<RecipeThumbNailResponseDto> getHealthyRecipeList(Long userId) {
        RestTemplate restTemplate = new RestTemplate();
        class HealthyRecipeRequestDto {
            long user_id;
            int period;

            public HealthyRecipeRequestDto(long user_id, int period) {
                this.user_id = user_id;
                this.period = period;
            }
        }
        HealthyRecipeRequestDto body = new HealthyRecipeRequestDto(userId, 1);
        List<Long> idList = restTemplate.postForObject(RECOMMENDATION_SERVER_URL + "/recommend_nutrient", body, List.class);
        System.out.println(idList.toString());
        // search recipes by id list
        return recipeRepository.searchRecipeByIdList(idList).stream()
                .map(r -> new RecipeThumbNailResponseDto(r))
                .collect(Collectors.toList());
    }

    public RecipeDetailPageResponseDto getRecipeDetailPageData(Long id, User loginUser) {
        // n+1 -> 쿼리 2방으로 줄임
        Recipe recipeWithNutrientAndManual = recipeRepository.searchRecipeWithNutrientAndManualById(id)
                .orElseThrow(RecipeNotFoundException::new);
        List<RecipeIngredientDto> ingredientList = ingredientRepository.searchIngredientByRecipe(recipeWithNutrientAndManual)
                .orElseThrow(RecipeRelationalDataNotFoundException::new);
        // 평가
        // 내 평가
        Evaluation e = evaluationRepository.searchByUserAndRecipe(loginUser, recipeWithNutrientAndManual)
                .orElse(null);
        UserEvaluationInfoDto evalInfo = new UserEvaluationInfoDto(e == null ? false : true, e == null ? 0 : e.getScore());
        // 레시피 평가 리스트
        List<EvaluationDto> evaluationList = evaluationRepository.searchAllByRecipe(recipeWithNutrientAndManual)
                .orElseThrow(RecipeRelationalDataNotFoundException::new);
        Integer evalSum = evaluationList.stream()
                .map(sc -> sc.getScore())
                .reduce((sum, sc) -> sum + sc).orElse(0);
        Float avgEvaluationScore = evaluationList.size() == 0 ? 0 : ((float) evalSum / evaluationList.size());
        // 나에게 있는 재료 리스트 구하기
        ArrayList<Long> ingList = new ArrayList<>();
        for (RecipeIngredientDto ri : ingredientList) {
            ingList.add(ri.getId());
        }
        List<RefrigeratorIngredientDto> myIngredientList = ingredientRepository.searchRecipeIngredientUserHas(loginUser, ingList)
                .orElseThrow(RecipeRelationalDataNotFoundException::new);
        return new RecipeDetailPageResponseDto(recipeWithNutrientAndManual, ingredientList, evalInfo, avgEvaluationScore, evaluationList, myIngredientList);
    }

    public List<RecipeAndFoodSearchResponseDto> searchRecipeAndFoodByNameAndIngredient(String keyword, List<Long> ingredientIdList, boolean withFood) {
        List<Recipe> candidateList = recipeRepository.searchRecipeByNameLikeWithIngredient(keyword)
                .orElseThrow(RecipeNotFoundException::new);

        Set<Long> ingSet = new HashSet<>(ingredientIdList);
        List<RecipeAndFoodSearchResponseDto> res = new ArrayList<>();
        for (Recipe r : candidateList) {
            int cnt = 0;
            for (Long ingId : ingSet) {
                boolean isExist = false;
                for (RecipeIngredient ri : r.getRecipeIngredients()) {
                    if (ri.getIngredient().getId().equals(ingId)) {
                        isExist = true;
                        break;
                    }
                }
                if (isExist) cnt++;
            }
            if (ingSet.size() == cnt) res.add(new RecipeAndFoodSearchResponseDto(r));
        }

        if (withFood) {
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

    public RecipeNutrientDto getFoodNutrient(Long id) {
        Food f = recipeRepository.searchFoodWithNutrientById(id)
                .orElseThrow(FoodNotFoundException::new);
        return new RecipeNutrientDto(f.getWeight(), f.getNutrient());
    }


}
