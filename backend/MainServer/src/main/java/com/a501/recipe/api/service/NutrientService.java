package com.a501.recipe.api.service;

import com.a501.recipe.aop.exception.NutrientDataNotFoundException;
import com.a501.recipe.api.domain.entity.*;
import com.a501.recipe.api.domain.enums.LargeCategory;
import com.a501.recipe.api.domain.enums.RecommendedNutrientType;
import com.a501.recipe.api.dto.ingredient.IngredientDto;
import com.a501.recipe.api.dto.nutrient.MajorNutrientDto;
import com.a501.recipe.api.dto.nutrient.NutrientDetailResponseDto;
import com.a501.recipe.api.dto.nutrient.NutrientRatioDto;
import com.a501.recipe.api.dto.recipe.RecipeDto;
import com.a501.recipe.api.repository.NutrientRepository;
import com.a501.recipe.util.AgeCalculator;
import com.a501.recipe.util.NutrientIdGetter;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.util.*;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class NutrientService {

    private final NutrientRepository nutrientRepository;

    public NutrientRatioDto getDailyNutrientInfo(User loginUser, Integer day) {
        Calendar cal = Calendar.getInstance();
        Date today = new Date();
        cal.setTime(today);
        cal.add(Calendar.DATE, -1 * (day-1));

        SimpleDateFormat dtFormat = new SimpleDateFormat("yyyy-MM-dd");
        String fromDateStr = dtFormat.format(cal.getTime());
        LocalDate fromDate = LocalDate.parse(fromDateStr);

        List<UserIntake> intakeRecipeList = nutrientRepository.searchDailyIntakeRecipeWithNutrientFrom(loginUser, fromDate)
                .orElseThrow(NutrientDataNotFoundException::new);
        List<UserIntake> intakeFoodList = nutrientRepository.searchDailyIntakeFoodWithNutrientFrom(loginUser, fromDate)
                .orElseThrow(NutrientDataNotFoundException::new);

        // 영양소 합
        float kcalSum = 0;
        float carbohydrateSum = 0;
        float proteinSum = 0;
        float fatSum = 0;
        float sodiumSum = 0;

        for (UserIntake ui : intakeFoodList) {
            Food food = ui.getFood();
            Nutrient nutrient = food.getNutrient();
            float intakeRatio = ui.getAmount() / food.getWeight();
            kcalSum += intakeRatio * nutrient.getKcal();
            carbohydrateSum += intakeRatio * nutrient.getCarbohydrate();
            proteinSum += intakeRatio * nutrient.getProtein();
            fatSum += intakeRatio * nutrient.getFat();
            sodiumSum += intakeRatio * nutrient.getSodium();
        }

        for (UserIntake ui : intakeRecipeList) {
            Recipe recipe = ui.getRecipe();
            Nutrient nutrient = recipe.getNutrient();
            float intakeRatio = ui.getAmount() / recipe.getWeight();
            kcalSum += intakeRatio * nutrient.getKcal();
            carbohydrateSum += intakeRatio * nutrient.getCarbohydrate();
            proteinSum += intakeRatio * nutrient.getProtein();
            fatSum += intakeRatio * nutrient.getFat();
            sodiumSum += intakeRatio * nutrient.getSodium();
        }

        int userAge = AgeCalculator.getAge(loginUser.getBirthday());
        Nutrient recommendedIntakeNutrient = nutrientRepository.searchRecommendedIntakeNutrientByUser(loginUser.getGender(), userAge, RecommendedNutrientType.RECOMMENDED)
                .orElseThrow(NutrientDataNotFoundException::new);

        return NutrientRatioDto.builder()
                .kcalRatio(Math.min(2, (kcalSum / (recommendedIntakeNutrient.getKcal() * day))))
                .carbohydrateRatio(Math.min(2,(carbohydrateSum / (recommendedIntakeNutrient.getCarbohydrate() * day))))
                .proteinRatio(Math.min(2,(proteinSum / (recommendedIntakeNutrient.getProtein() * day))))
                .fatRatio(Math.min(2,(fatSum / (recommendedIntakeNutrient.getFat() * day))))
                .sodiumRatio(Math.min(2,(sodiumSum / (recommendedIntakeNutrient.getSodium() * day))))
                .build();
    }

    public NutrientDetailResponseDto getDailyNutrientDetail(User loginUser, Integer day) {
        Calendar cal = Calendar.getInstance();
        Date today = new Date();
        cal.setTime(today);
        cal.add(Calendar.DATE, -1 * (day-1));

        SimpleDateFormat dtFormat = new SimpleDateFormat("yyyy-MM-dd");
        String fromDateStr = dtFormat.format(cal.getTime());
        LocalDate fromDate = LocalDate.parse(fromDateStr);

        List<UserIntake> intakeRecipeList = nutrientRepository.searchDailyIntakeRecipeWithIngredientAndNutrientFrom(loginUser, fromDate)
                .orElseThrow(NutrientDataNotFoundException::new);
        List<UserIntake> intakeFoodList = nutrientRepository.searchDailyIntakeFoodWithIngredientAndNutrientFrom(loginUser, fromDate)
                .orElseThrow(NutrientDataNotFoundException::new);

        MajorNutrientDto intakeMajorNutrient = new MajorNutrientDto();

        for (UserIntake ui : intakeFoodList) {
            Food food = ui.getFood();
            Nutrient nutrient = food.getNutrient();
            float intakeRatio = ui.getAmount() / food.getWeight();
            MajorNutrientDto nutToAdd = new MajorNutrientDto(nutrient,intakeRatio);
            intakeMajorNutrient.addNutrient(nutToAdd);
        }

        class RecipeCnt {
            RecipeDto recipeDto;
            Integer cnt;
            public RecipeCnt(Recipe r) { this.recipeDto=new RecipeDto(r); this.cnt=0; }
        }
        class IngredientCnt {
            IngredientDto ingredientDto;
            Integer cnt;
            public IngredientCnt(Ingredient i) { this.ingredientDto=new IngredientDto(i); this.cnt=0; }
        }

        Map<Long,RecipeCnt> recipeCntMap = new HashMap<>();
        Map<Long, IngredientCnt> ingredientCntMap = new HashMap<>();
        for (UserIntake ui : intakeRecipeList) {
            Recipe recipe = ui.getRecipe();
            Nutrient nutrient = recipe.getNutrient();
            float intakeRatio = ui.getAmount() / recipe.getWeight();
            MajorNutrientDto nutToAdd = new MajorNutrientDto(nutrient,intakeRatio);
            intakeMajorNutrient.addNutrient(nutToAdd);

            // 가장 많이 먹은 레시피, 재료
            Long recipeId = recipe.getId();
            if(!recipeCntMap.containsKey(recipeId)) recipeCntMap.put(recipeId,new RecipeCnt(recipe));
            recipeCntMap.get(recipeId).cnt++;
            for(RecipeIngredient ing : recipe.getRecipeIngredients()){
                Long ingredientId = ing.getIngredient().getId();
                if(ing.getIngredient().getLargeCategory().equals(LargeCategory.SeasoningAndOil.getName())) continue;
                if(ing.getIngredient().getLargeCategory().equals(LargeCategory.Other.getName())) continue;
                if(!ingredientCntMap.containsKey(ingredientId)) ingredientCntMap.put(ingredientId, new IngredientCnt(ing.getIngredient()));
                ingredientCntMap.get(ingredientId).cnt++;
            }
        }

        ArrayList<RecipeCnt> recipeCntList = new ArrayList<>();
        ArrayList<IngredientCnt> ingredientCntList = new ArrayList<>();

        for(Long key : recipeCntMap.keySet()){
            recipeCntList.add(recipeCntMap.get(key));
        }
        for(Long key : ingredientCntMap.keySet()){
            ingredientCntList.add(ingredientCntMap.get(key));
        }
        recipeCntList.sort((r1,r2)->r2.cnt-r1.cnt);
        ingredientCntList.sort((i1,i2)->i2.cnt-i1.cnt);

        List<RecipeDto> top5RecipeList = new ArrayList<>();
        List<IngredientDto> top5IngredientList = new ArrayList<>();

        for(int i=0; i<Math.min(5,recipeCntList.size()); i++) {
            top5RecipeList.add(recipeCntList.get(i).recipeDto);
        }
        for(int i=0; i<Math.min(5,ingredientCntList.size()); i++) {
            top5IngredientList.add(ingredientCntList.get(i).ingredientDto);
        }

        // 7일 권장 섭취량
        int userAge = AgeCalculator.getAge(loginUser.getBirthday());
        Nutrient recommendedIntakeNutrient = nutrientRepository.searchRecommendedIntakeNutrientByUser(loginUser.getGender(), userAge, RecommendedNutrientType.RECOMMENDED)
                .orElseThrow(NutrientDataNotFoundException::new);

        MajorNutrientDto recommendedIntakeMajorNutrient = new MajorNutrientDto(recommendedIntakeNutrient,day);

        return NutrientDetailResponseDto.builder()
                .totalIntakeNutrient(intakeMajorNutrient)
                .recommendedIntakeNutrient(recommendedIntakeMajorNutrient)
                .mostIntakeRecipeList(top5RecipeList)
                .mostIntakeIngredientList(top5IngredientList)
                .build();
    }
}
