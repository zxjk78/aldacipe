package com.a501.recipe.api.controller;

import com.a501.recipe.api.dto.ingredient.IngredientDto;
import com.a501.recipe.api.dto.response.ManyResult;
import com.a501.recipe.api.service.IngredientService;
import com.a501.recipe.api.service.ResponseService;
import io.swagger.annotations.Api;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@Api(tags = "03. Ingredient Controller")
@RestController
@RequiredArgsConstructor
@RequestMapping("/ingredient")
public class IngredientController {

    private final IngredientService ingredientService;
    private final ResponseService responseService;

    @GetMapping("/search")
    public ManyResult<IngredientDto> searchIngredientByNameLike(@RequestParam("keyword") String keyword) {
        return responseService.getManyResult(ingredientService.searchIngredientByNameLike(keyword));
    }

}
