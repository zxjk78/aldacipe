package com.a501.recipe.api.controller;

import com.a501.recipe.aop.LoginUser;
import com.a501.recipe.api.domain.entity.User;
import com.a501.recipe.api.dto.ingredient.IngredientDto;
import com.a501.recipe.api.dto.nutrient.NutrientDto;
import com.a501.recipe.api.dto.nutrient.RecipeNutrientDto;
import com.a501.recipe.api.dto.recipe.RecipeAndFoodSearchResponseDto;
import com.a501.recipe.api.dto.recipe.RecipeDetailPageResponseDto;
import com.a501.recipe.api.dto.recipe.RecipeDto;
import com.a501.recipe.api.dto.recipe.RecipeThumbNailResponseDto;
import com.a501.recipe.api.dto.response.ManyResult;
import com.a501.recipe.api.dto.response.OneResult;
import com.a501.recipe.api.service.RecipeService;
import com.a501.recipe.api.service.ResponseService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import springfox.documentation.annotations.ApiIgnore;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@Api(tags = "05. Recipe Controller")
@RestController
@RequiredArgsConstructor
@RequestMapping("/recipe")
public class RecipeController {

    private final RecipeService recipeService;
    private final ResponseService responseService;


    @ApiOperation(value = "레시피 검색 (이름, 재료)")
    @GetMapping("/search")
    public ManyResult<RecipeAndFoodSearchResponseDto> searchRecipeByNameAndIngredient(@RequestParam("keyword") String keyword,
                                                                                      @RequestParam(value = "ingredient", required = false, defaultValue = "None") String ingredients,
                                                                                      @RequestParam(value = "with-food",required = false, defaultValue = "false") String withFood  ) {

        final List<Long> ingredientIdList = new ArrayList<>();
        if(!ingredients.equals("None"))
                Arrays.stream(ingredients.split("-")).forEach(str-> {
                    ingredientIdList.add(Long.parseLong(str));
                });
        return responseService.getManyResult(recipeService.searchRecipeAndFoodByNameAndIngredient(keyword, ingredientIdList, withFood.equals("true")));
    }


    @ApiOperation(value = "레시피 영양정보 조회")
    @GetMapping("/{id}/nutrient")
    public OneResult<RecipeNutrientDto> getRecipeNutrient(@PathVariable("id") Long id) {
        return responseService.getOneResult(recipeService.getRecipeNutrient(id));
    }

    @ApiOperation(value = "레시피 상세 페이지")
    @GetMapping("/{id}")
    public OneResult<RecipeDetailPageResponseDto> getRecipeDetailPageInfo(@ApiIgnore @LoginUser User loginUser, @PathVariable("id") Long id) {
        return responseService.getOneResult(recipeService.getTestRecipe(id, loginUser));
    }


    @ApiOperation(value = "24시간 동안 가장 인기 있는 요리")
    @GetMapping("/popular")
    public ManyResult<RecipeThumbNailResponseDto> getPopularRecipeList() {
        return responseService.getManyResult(recipeService.getPopularRecipeList());
    }

    @ApiOperation(value = "냉장고 재료로 만들 수 있는 요리")
    @GetMapping("/cookable")
    public ManyResult<RecipeThumbNailResponseDto> getCookableRecipeList() {
        return responseService.getManyResult(recipeService.getCookableRecipeList());
    }

    @ApiOperation(value = "회원과 유사한 사람들이 선택한 요리")
    @GetMapping("/likable")
    public ManyResult<RecipeThumbNailResponseDto> getLikableRecipeList() {
        return responseService.getManyResult(recipeService.getLikableRecipeList());
    }
}
