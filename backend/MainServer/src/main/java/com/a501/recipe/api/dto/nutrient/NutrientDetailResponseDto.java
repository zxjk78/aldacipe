package com.a501.recipe.api.dto.nutrient;

import com.a501.recipe.api.dto.ingredient.IngredientDto;
import com.a501.recipe.api.dto.intake.IntakeDto;
import com.a501.recipe.api.dto.recipe.RecipeDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class NutrientDetailResponseDto {
    private MajorNutrientDto totalIntakeNutrient;
    private MajorNutrientDto recommendedIntakeNutrient;
    private List<RecipeDto> mostIntakeRecipeList;
    private List<IngredientDto> mostIntakeIngredientList;
}
