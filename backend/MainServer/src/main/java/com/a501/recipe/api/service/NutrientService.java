package com.a501.recipe.api.service;

import com.a501.recipe.aop.exception.NutrientDataNotFoundException;
import com.a501.recipe.api.domain.entity.*;
import com.a501.recipe.api.dto.nutrient.NutrientRatioDto;
import com.a501.recipe.api.repository.NutrientRepository;
import com.a501.recipe.util.AgeCalculator;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class NutrientService {

    private final NutrientRepository nutrientRepository;

    public NutrientRatioDto getDailyNutrientInfo(User loginUser, Integer day) {
        Calendar cal = Calendar.getInstance();
        Date today = new Date();
        cal.setTime(today);
        cal.add(Calendar.DATE, -1 * day);

        SimpleDateFormat dtFormat = new SimpleDateFormat("yyyy-MM-dd");
        String fromDateStr = dtFormat.format(cal.getTime());
        LocalDate fromDate = LocalDate.parse(fromDateStr);

        List<UserIntake> intakeRecipeList = nutrientRepository.searchDailyIntakeRecipeWithNutrientFrom(loginUser, fromDate)
                .orElseThrow(NutrientDataNotFoundException::new);
        List<UserIntake> intakeFoodList = nutrientRepository.searchDailyIntakeFoodWithNutrientFrom(loginUser, fromDate)
                .orElseThrow(NutrientDataNotFoundException::new);
//        List<UserIntake> intakeList = new ArrayList<>();
//        intakeList.addAll(nutrientRepository.searchDailyFoodNutrientFrom(loginUser,fromDate)
//                .orElseThrow(NutrientDataNotFoundException::new));
//        intakeList.addAll(nutrientRepository.searchDailyRecipeNutrientFrom(loginUser,fromDate)
//                .orElseThrow(NutrientDataNotFoundException::new));

        System.out.println("#### 먹은 음식 개수 : " + intakeFoodList.size() + " & 먹은 레시피 개수 : " + intakeRecipeList.size());

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
        Nutrient recommendedIntakeNutrient = nutrientRepository.searchRecommendedIntakeNutrientByUser(loginUser.getGender(), userAge)
                .orElseThrow(NutrientDataNotFoundException::new);

        return NutrientRatioDto.builder()
                .kcalRatio(kcalSum / (recommendedIntakeNutrient.getKcal() * day))
                .carbohydrateRatio(carbohydrateSum / (recommendedIntakeNutrient.getCarbohydrate() * day))
                .proteinRatio(proteinSum / (recommendedIntakeNutrient.getProtein() * day))
                .fatRatio(fatSum / (recommendedIntakeNutrient.getFat() * day))
                .sodiumRatio(sodiumSum / (recommendedIntakeNutrient.getSodium() * day))
                .build();
    }
}
