package com.a501.recipe.api.dto.recipe;

import com.a501.recipe.api.domain.entity.Evaluation;
import com.a501.recipe.api.domain.entity.Manual;
import com.a501.recipe.api.domain.entity.Nutrient;
import com.a501.recipe.api.domain.entity.Recipe;
import com.a501.recipe.api.dto.evaluation.EvaluationDto;
import com.a501.recipe.api.dto.evaluation.UserEvaluationInfoDto;
import com.a501.recipe.api.dto.ingredient.IngredientDto;
import com.a501.recipe.api.dto.ingredient.RecipeIngredientDto;
import com.a501.recipe.api.dto.ingredient.RefrigeratorIngredientDto;
import com.a501.recipe.api.dto.manual.ManualDto;
import com.a501.recipe.api.dto.nutrient.NutrientDto;
import lombok.Getter;

import java.util.List;
import java.util.stream.Collectors;

@Getter
public class RecipeDetailPageResponseDto {

    private RecipeDto recipe;
    private NutrientDto nutrient;
    private List<RecipeIngredientDto> ingredientList;
    private List<RefrigeratorIngredientDto> ingredientListIHave;
    private List<ManualDto> manualList;

    private UserEvaluationInfoDto userEvaluationInfo;
    private Float avgEvalutationScore;
    private List<EvaluationDto> evaluationList;


    public RecipeDetailPageResponseDto(Recipe recipe
            , List<RecipeIngredientDto> recipeIngredientDtoList
            , UserEvaluationInfoDto userEvalInfo
            , Float avgEvalutationScore
            , List<EvaluationDto> evaluationList
            , List<RefrigeratorIngredientDto> myIngredientList)
    {
        this.recipe = new RecipeDto(recipe);
        this.nutrient = new NutrientDto(recipe.getNutrient());
        this.manualList = recipe.getManuals().stream()
                .map(m->new ManualDto(m))
                .collect(Collectors.toList());
        this.ingredientList = recipeIngredientDtoList;
        this.userEvaluationInfo = userEvalInfo;
        this.avgEvalutationScore = avgEvalutationScore;
        this.evaluationList = evaluationList;
        this.ingredientListIHave = myIngredientList;
    }


}
