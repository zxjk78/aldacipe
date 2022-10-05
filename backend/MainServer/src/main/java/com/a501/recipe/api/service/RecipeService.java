package com.a501.recipe.api.service;

import com.a501.recipe.aop.exception.FoodNotFoundException;
import com.a501.recipe.aop.exception.RecipeNotFoundException;
import com.a501.recipe.aop.exception.RecipeRelationalDataNotFoundException;
import com.a501.recipe.api.domain.entity.*;
import com.a501.recipe.api.domain.enums.IntakeType;
import com.a501.recipe.api.dto.evaluation.EvaluationDto;
import com.a501.recipe.api.dto.evaluation.UserEvaluationInfoDto;
import com.a501.recipe.api.dto.ingredient.RecipeIngredientDto;
import com.a501.recipe.api.dto.ingredient.RefrigeratorIngredientDto;
import com.a501.recipe.api.dto.nutrient.RecipeNutrientDto;
import com.a501.recipe.api.dto.recipe.RecipeAndFoodSearchResponseDto;
import com.a501.recipe.api.dto.recipe.RecipeDetailPageResponseDto;
import com.a501.recipe.api.dto.recipe.RecipeThumbNailResponseDto;
import com.a501.recipe.api.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
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
    private final RefrigeratorRepository refrigeratorRepository;
    private final IntakeRepository intakeRepository;

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

        Map<String,String> bodyMap = new HashMap<>();
        bodyMap.put("user_id",userId.toString());
        List<Integer> response = restTemplate.postForObject(RECOMMENDATION_SERVER_URL + "/recommend_refrigerator", bodyMap, List.class);
        List<Long> idList = new ArrayList<>();
        for (Integer i : response) {
            idList.add(Long.valueOf(i));
        }
        System.out.println("### COOKABLE ###");
        System.out.println(idList.toString());
        System.out.println("#### COOKABLE IDLIST END ####");


        // search recipes by id list
        return recipeRepository.searchRecipeByIdList(idList).stream()
                .map(r -> new RecipeThumbNailResponseDto(r))
                .collect(Collectors.toList());
    }

    public List<RecipeThumbNailResponseDto> getLikableRecipeList(Long userId) {
        RestTemplate restTemplate = new RestTemplate();

        Map<String,String> bodyMap = new HashMap<>();
        bodyMap.put("user_id",userId.toString());

        List<Integer> response = restTemplate.postForObject(RECOMMENDATION_SERVER_URL + "/recommend_sgd", bodyMap, List.class);
        List<Long> idList = new ArrayList<>();
        for (Integer i : response) {
            idList.add(Long.valueOf(i));
        }
        System.out.println("### Likable ###");
        System.out.println(idList.toString());
        System.out.println("#### Likable IDLIST END ####");


        // search recipes by id list
        return recipeRepository.searchRecipeByIdList(idList).stream()
                .map(r -> new RecipeThumbNailResponseDto(r))
                .collect(Collectors.toList());
    }

    public List<RecipeThumbNailResponseDto> getHealthyRecipeList(Long userId) {
        RestTemplate restTemplate = new RestTemplate();

        Map<String,String> bodyMap = new HashMap<>();
        bodyMap.put("user_id",userId.toString());
        bodyMap.put("period","1");

        List<Integer> response  = restTemplate.postForObject(RECOMMENDATION_SERVER_URL + "/recommend_nutrient", bodyMap, List.class);
        List<Long> idList = new ArrayList<>();
        for (Integer i : response) {
            idList.add(Long.valueOf(i));
        }
        System.out.println("### HEALTHY ###");
        System.out.println(idList.toString());
        System.out.println("#### HEALTHY IDLIST END ####");

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
        int resCnt=0;

        List<RecipeAndFoodSearchResponseDto> res = new ArrayList<>();
        for (Recipe r : candidateList) {
            Set<Long> riSet = new HashSet<>(r.getRecipeIngredients().stream()
                    .map(ri->ri.getIngredient().getId()).collect(Collectors.toList()));
            boolean allHave = true;
            for(Long ingId : ingredientIdList){
                if(!riSet.contains(ingId)) {
                    allHave=false;
                    break;
                }
            }
            if(allHave) {
                res.add(new RecipeAndFoodSearchResponseDto(r));
                resCnt++;
                if(resCnt==20) break;
            }

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


    @Transactional
    public void intakeRecipe(User loginUser, Long recipeId) {
        Recipe recipe = recipeRepository.searchRecipeWithIngredient(recipeId)
                .orElseThrow(RecipeNotFoundException::new);

        // 사용자 섭취
        UserIntake userIntake = UserIntake.builder()
                .user(loginUser)
                .intakeType(IntakeType.RECIPE)
                .amount(recipe.getWeight())
                .recipe(recipe)
                .intakeDate(LocalDate.now())
                .build();
        intakeRepository.save(userIntake);

        // 레시피 재료
        List<RecipeIngredient> recipeIngredientList = recipe.getRecipeIngredients();
        // 냉장고 재료
        List<RefrigeratorIngredient> refrigeratorIngredientList = refrigeratorRepository.findAllMyRefrigeratorIngredient(loginUser);
        Map<Long,RefrigeratorIngredient> refMap = new HashMap<>();
        for(RefrigeratorIngredient ri : refrigeratorIngredientList) {
            refMap.put(ri.getIngredient().getId(), ri);
        }
        // 냉장고 재료에 존재한다면 1인분 재료만큼 gram 수 차감
        for(RecipeIngredient recipeIngredient : recipeIngredientList){
            Long ingId = recipeIngredient.getIngredient().getId();
            if(refMap.containsKey(ingId)){
                RefrigeratorIngredient currentRefIng = refMap.get(ingId);
                float currentWeight = currentRefIng.getWeight();
                float weightToReduce = recipeIngredient.getWeight();
                float reducedWeight = currentWeight-weightToReduce;
//                System.out.println("### "+currentRefIng.getWeight()+" --> 새 무게 "+reducedWeight);
                if(reducedWeight>0) {
                    currentRefIng.updateWeight(reducedWeight);
                } else {
                    // 0 gram이 되면 냉장고 식재료에서 제거
                    refrigeratorRepository.delete(currentRefIng);
                }
            }
        }

    }
}
