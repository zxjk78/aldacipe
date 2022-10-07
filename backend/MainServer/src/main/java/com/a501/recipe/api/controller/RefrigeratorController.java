package com.a501.recipe.api.controller;

import com.a501.recipe.aop.LoginUser;
import com.a501.recipe.aop.exception.AccessDeniedException;
import com.a501.recipe.api.domain.entity.RefrigeratorIngredient;
import com.a501.recipe.api.domain.entity.User;
import com.a501.recipe.api.dto.ingredient.RefrigeratorIngredientDto;
import com.a501.recipe.api.dto.refrigerator.RefrigeratorInsertRequestDto;
import com.a501.recipe.api.dto.refrigerator.RefrigeratorUpdateRequestDto;
import com.a501.recipe.api.dto.response.CommonResult;
import com.a501.recipe.api.dto.response.ManyResult;
import com.a501.recipe.api.service.RefrigeratorService;
import com.a501.recipe.api.service.ResponseService;
import io.swagger.annotations.Api;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import springfox.documentation.annotations.ApiIgnore;

@Api(tags = "04. Refrigerator Controller")
@RestController
@RequiredArgsConstructor
@RequestMapping("/user/{userId}/refrigerator")
public class RefrigeratorController {

    private final RefrigeratorService refrigeratorService;
    private final ResponseService responseService;

    // 냉장고 재료
    @GetMapping()
    public ManyResult<RefrigeratorIngredientDto> getAllMyRefrigeratorIngredients(@ApiIgnore @LoginUser User loginUser,
                                                                                 @PathVariable("userId") Long userId) {
        if (!userId.equals(loginUser.getId())) throw new AccessDeniedException();
        return responseService.getManyResult(refrigeratorService.getMyRefrigeratorIngredient(loginUser));
    }

    @PostMapping("/{ingredientId}")
    public CommonResult insertIngredient(@ApiIgnore @LoginUser User loginUser,
                                         @PathVariable("userId") Long userId,
                                         @PathVariable("ingredientId") Long ingredientId,
                                         @RequestBody RefrigeratorInsertRequestDto refrigeratorInsertRequestDto) {
        if (!userId.equals(loginUser.getId())) throw new AccessDeniedException();
        refrigeratorService.insertIngredient(loginUser, ingredientId, refrigeratorInsertRequestDto);
        return responseService.getSuccessResult();
    }

    @DeleteMapping("/{ingredientId}")
    public CommonResult deleteIngredient(@ApiIgnore @LoginUser User loginUser,
                                         @PathVariable("userId") Long userId,
                                         @PathVariable("ingredientId") Long ingredientId) {
        if (!userId.equals(loginUser.getId())) throw new AccessDeniedException();
        refrigeratorService.deleteIngredient(loginUser, ingredientId);
        return responseService.getSuccessResult();
    }

    @PutMapping("/{ingredientId}")
    public CommonResult updateIngredient(@ApiIgnore @LoginUser User loginUser,
                                         @PathVariable("userId") Long userId,
                                         @PathVariable("ingredientId") Long ingredientId,
                                         @RequestBody RefrigeratorUpdateRequestDto refrigeratorUpdateRequestDto) {
        if (!userId.equals(loginUser.getId())) throw new AccessDeniedException();
        refrigeratorService.updateIngredient(loginUser, ingredientId, refrigeratorUpdateRequestDto);
        return responseService.getSuccessResult();
    }
}
