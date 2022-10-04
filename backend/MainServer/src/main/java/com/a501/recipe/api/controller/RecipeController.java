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
import com.a501.recipe.api.dto.response.CommonResult;
import com.a501.recipe.api.dto.response.ManyResult;
import com.a501.recipe.api.dto.response.OneResult;
import com.a501.recipe.api.service.RecipeService;
import com.a501.recipe.api.service.ResponseService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
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
    @ApiImplicitParams(
            {
                    @ApiImplicitParam(name = "keyword", value = "검색할 키워드"),
                    @ApiImplicitParam(name = "ingredient", value = "재료 포함 검색 시에만 재료id1-재료id2-재료id3 형식으로 전달"),
                    @ApiImplicitParam(name = "with-food", value = "true 전달 시 검색 범위를 레시피 -> 레시피+음식으로 넓힘")
            }
    )
    @GetMapping("/search")
    public ManyResult<RecipeAndFoodSearchResponseDto> searchRecipeByNameAndIngredient(@RequestParam(value = "keyword", required = false, defaultValue = "") String keyword,
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
    @ApiImplicitParam(name = "type", value = "recipe or food 입력")
    @GetMapping("/{id}/nutrient")
    public CommonResult getRecipeNutrient(@PathVariable("id") Long id,
                                          @RequestParam("type") String type) {
        if("recipe".equals(type))
            return responseService.getOneResult(recipeService.getRecipeNutrient(id));
        else if("food".equals(type))
            return responseService.getOneResult(recipeService.getFoodNutrient(id));
        else return responseService.getFailResult(400, "잘못된 영양소 조회 타입");
    }

    @ApiOperation(value = "레시피 상세 페이지")
    @GetMapping("/{id}")
    public OneResult<RecipeDetailPageResponseDto> getRecipeDetailPageInfo(@ApiIgnore @LoginUser User loginUser, @PathVariable("id") Long id) {
        return responseService.getOneResult(recipeService.getRecipeDetailPageData(id, loginUser));
    }


    @ApiOperation(value = "24시간 동안 가장 인기 있는 요리")
    @GetMapping("/popular")
    public ManyResult<RecipeThumbNailResponseDto> getPopularRecipeList() {
        int day = 1;
        return responseService.getManyResult(recipeService.getPopularRecipeList(1));
    }

    @ApiOperation(value = "냉장고 재료로 만들 수 있는 요리")
    @GetMapping("/cookable")
    public ManyResult<RecipeThumbNailResponseDto> getCookableRecipeList(@ApiIgnore @LoginUser User loginUser) {
        return responseService.getManyResult(recipeService.getCookableRecipeList(loginUser.getId()));
    }

    @ApiOperation(value = "회원과 유사한 사람들이 선택한 요리")
    @GetMapping("/likable")
    public ManyResult<RecipeThumbNailResponseDto> getLikableRecipeList(@ApiIgnore @LoginUser User loginUser) {
        return responseService.getManyResult(recipeService.getLikableRecipeList(loginUser.getId()));
    }

    @ApiOperation(value = "영양소 균형을 위한 추천 요리")
    @GetMapping("/healthy")
    public ManyResult<RecipeThumbNailResponseDto> getHealthyRecipeList(@ApiIgnore @LoginUser User loginUser) {
        return responseService.getManyResult(recipeService.getHealthyRecipeList(loginUser.getId()));
    }
}
