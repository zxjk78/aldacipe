package com.a501.recipe.api.controller;

import com.a501.recipe.api.dto.recipe.RecipeResponseDto;
import com.a501.recipe.api.dto.response.CommonResult;
import com.a501.recipe.api.dto.response.ManyResult;
import com.a501.recipe.api.service.RecipeService;
import com.a501.recipe.api.service.ResponseService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashSet;
import java.util.Set;

@Api(tags = "05. Recipe Controller")
@RestController
@RequiredArgsConstructor
@RequestMapping("/recipe")
public class RecipeController {

    private final RecipeService recipeService;
    private final ResponseService responseService;

    @ApiOperation(value = "24시간 동안 가장 인기 있는 요리")
    @GetMapping("/popular")
    public ManyResult<RecipeResponseDto> getPopularRecipeList() {
       return responseService.getManyResult(recipeService.getPopularRecipeList());
    }

    @ApiOperation(value = "냉장고 재료로 만들 수 있는 요리")
    @GetMapping("/cookable")
    public ManyResult<RecipeResponseDto> getCookableRecipeList() {
        return responseService.getManyResult(recipeService.getCookableRecipeList());
    }

    @ApiOperation(value = "회원과 유사한 사람들이 선택한 요리")
    @GetMapping("/likable")
    public ManyResult<RecipeResponseDto> getLikableRecipeList() {
        return responseService.getManyResult(recipeService.getLikableRecipeList());
    }
}
