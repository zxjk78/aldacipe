package com.a501.recipe.api.controller;

import com.a501.recipe.aop.LoginUser;
import com.a501.recipe.aop.exception.AccessDeniedException;
import com.a501.recipe.api.domain.entity.User;
import com.a501.recipe.api.dto.response.CommonResult;
import com.a501.recipe.api.dto.response.ManyResult;
import com.a501.recipe.api.dto.review.ReviewDto;
import com.a501.recipe.api.dto.review.ReviewPostRequestDto;
import com.a501.recipe.api.service.ResponseService;
import com.a501.recipe.api.service.ReviewService;
import io.swagger.annotations.Api;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import springfox.documentation.annotations.ApiIgnore;

@Api(tags = "09. Review Controller")
@RestController
@RequiredArgsConstructor
@RequestMapping("/recipe/{recipeId}/review")
public class ReviewController {

    private final ReviewService reviewService;
    private final ResponseService responseService;


    @GetMapping()
    public ManyResult<ReviewDto> getAllReviewByRecipe(@PathVariable("recipeId") Long recipeId) {
        return responseService.getManyResult(reviewService.getAllReviewByRecipeId(recipeId));
    }

    @PostMapping()
    public CommonResult postReviewOnRecipe(@ApiIgnore @LoginUser User loginUser,
                                           @PathVariable("recipeId") Long recipeId,
                                           @RequestBody ReviewPostRequestDto reviewPostRequestDto) {
        reviewService.postReviewOnRecipe(loginUser, recipeId, reviewPostRequestDto);
        return responseService.getSuccessResult();
    }

    @DeleteMapping("/{reviewId}")
    public CommonResult deleteReviewOnRecipe(@ApiIgnore @LoginUser User loginUser,
                                             @PathVariable("recipeId") Long recipeId,
                                             @PathVariable("reviewId") Long reviewId) {
//        if (!userId.equals(loginUser.getId())) throw new AccessDeniedException();
        reviewService.deleteReviewOnRecipe(loginUser, reviewId);
        return responseService.getSuccessResult();
    }

}
