package com.a501.recipe.api.dto.nutrient;

import com.a501.recipe.api.domain.entity.Nutrient;
import com.a501.recipe.api.dto.nutrient.NutrientDto;
import lombok.Getter;

@Getter
public class RecipeNutrientDto extends NutrientDto {
    private float weight;

    public RecipeNutrientDto(float weight, Nutrient nutrient) {
        super(nutrient);
        this.weight=weight;
    }

}
