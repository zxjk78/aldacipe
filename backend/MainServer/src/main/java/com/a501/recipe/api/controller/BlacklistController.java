package com.a501.recipe.api.controller;

import com.a501.recipe.aop.LoginUser;
import com.a501.recipe.aop.exception.AccessDeniedException;
import com.a501.recipe.api.domain.entity.User;
import com.a501.recipe.api.dto.ingredient.IngredientDto;
import com.a501.recipe.api.dto.intake.IntakeUpdateRequestDto;
import com.a501.recipe.api.dto.response.CommonResult;
import com.a501.recipe.api.dto.response.ManyResult;
import com.a501.recipe.api.service.BlacklistService;
import com.a501.recipe.api.service.ResponseService;
import io.swagger.annotations.Api;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import springfox.documentation.annotations.ApiIgnore;

@Api(tags = "06. Blacklist Controller")
@RestController
@RequiredArgsConstructor
@RequestMapping("/user/{userId}/blacklist")
public class BlacklistController {

    private final BlacklistService blackListService;
    private final ResponseService responseService;


    @GetMapping()
    public ManyResult<IngredientDto> getAllMyBlacklistIngredients(@ApiIgnore @LoginUser User loginUser,
                                                                  @PathVariable("userId") Long userId) {
        if (!userId.equals(loginUser.getId())) throw new AccessDeniedException();
        return responseService.getManyResult(blackListService.getMyBlacklistIngredient(loginUser));
    }

    @PostMapping("/{ingredientId}")
    public CommonResult addBlacklistIngredient(@ApiIgnore @LoginUser User loginUser,
                                               @PathVariable("userId") Long userId,
                                               @PathVariable("ingredientId") Long ingredientId) {
        if (!userId.equals(loginUser.getId())) throw new AccessDeniedException();
        blackListService.addBlacklistIngredient(loginUser, ingredientId);
        return responseService.getSuccessResult();
    }

    @DeleteMapping("/{ingredientId}")
    public CommonResult deleteBlacklistIngredient(@ApiIgnore @LoginUser User loginUser,
                                                  @PathVariable("userId") Long userId,
                                                  @PathVariable("ingredientId") Long ingredientId) {
        if (!userId.equals(loginUser.getId())) throw new AccessDeniedException();
        blackListService.deleteBlacklistIngredient(loginUser, ingredientId);
        return responseService.getSuccessResult();
    }


}
