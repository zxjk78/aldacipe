package com.a501.recipe.api.controller;

import com.a501.recipe.api.dto.ingredient.IngredientDto;
import com.a501.recipe.api.dto.nutrient.NutrientDto;
import com.a501.recipe.api.dto.nutrient.RecipeNutrientDto;
import com.a501.recipe.api.dto.response.ManyResult;
import com.a501.recipe.api.dto.response.OneResult;
import com.a501.recipe.api.service.IngredientService;
import com.a501.recipe.api.service.ResponseService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@Api(tags = "03. Ingredient Controller")
@RestController
@RequiredArgsConstructor
@RequestMapping("/ingredient")
public class IngredientController {

    private final IngredientService ingredientService;
    private final ResponseService responseService;

    @ApiOperation(value = "식재료 검색")
    @GetMapping("/search")
    public ManyResult<IngredientDto> searchIngredientByNameLike(@RequestParam("keyword") String keyword) {
        return responseService.getManyResult(ingredientService.searchIngredientByNameLike(keyword));
    }

    @ApiOperation(value = "식재료 영양정보 조회")
    @GetMapping("/{id}/nutrient")
    public OneResult<NutrientDto> getIngredientNutrient(@PathVariable("id") Long id) {
        return responseService.getOneResult(ingredientService.getIngredientNutrient(id));
    }

}
