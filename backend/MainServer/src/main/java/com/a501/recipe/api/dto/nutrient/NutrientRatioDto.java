package com.a501.recipe.api.dto.nutrient;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class NutrientRatioDto {

    private float kcalRatio;
    private float carbohydrateRatio;
    private float proteinRatio;
    private float fatRatio;
    private float sodiumRatio;

}
