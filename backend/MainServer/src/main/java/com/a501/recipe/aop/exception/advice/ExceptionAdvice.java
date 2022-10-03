package com.a501.recipe.aop.exception.advice;

import com.a501.recipe.aop.exception.*;
import com.a501.recipe.api.dto.response.CommonResult;
import com.a501.recipe.api.service.ResponseService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import javax.servlet.http.HttpServletRequest;

@RestControllerAdvice // 모든 @Controller에서 발생하는 예외를 잡아 처리함, Json 형식으로 에러 응답
@RequiredArgsConstructor
public class  ExceptionAdvice {
    private final ResponseService responseService;

    @ExceptionHandler(Exception.class)
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    protected CommonResult defaultException(HttpServletRequest request, Exception e) {
        e.printStackTrace();
        return responseService.getFailResult(ErrorCode.DefaultException.getCode(), ErrorCode.DefaultException.getMessage());
    }

    @ExceptionHandler(UserNotFoundException.class)
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    protected CommonResult userNotFoundException(HttpServletRequest request, UserNotFoundException e) {
        return responseService.getFailResult(ErrorCode.UserNotFound.getCode(), ErrorCode.UserNotFound.getMessage());
    }

    @ExceptionHandler(EmailLoginFailedException.class)
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    protected CommonResult emailLoginFailedException(HttpServletRequest request, EmailLoginFailedException e) {
        return responseService.getFailResult(ErrorCode.EmailLoginFailed.getCode(), ErrorCode.EmailLoginFailed.getMessage());
    }

    @ExceptionHandler(EmailSignupFailedException.class)
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    protected CommonResult emailSignupFailedException(HttpServletRequest request, EmailSignupFailedException e) {
        return responseService.getFailResult(ErrorCode.EmailSignupFailed.getCode(), ErrorCode.EmailSignupFailed.getMessage());
    }

    @ExceptionHandler(AuthenticationEntryPointException.class)
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    protected CommonResult authenticationEntrypointException(HttpServletRequest request, AuthenticationEntryPointException e) {
        return responseService.getFailResult(ErrorCode.AuthenticationEntrypoint.getCode(), ErrorCode.AuthenticationEntrypoint.getMessage());
    }

    @ExceptionHandler(AccessDeniedException.class)
    @ResponseStatus(HttpStatus.NOT_ACCEPTABLE)
    protected CommonResult accessDeniedException(HttpServletRequest request, AccessDeniedException e) {
        return responseService.getFailResult(ErrorCode.AccessDenied.getCode(), ErrorCode.AccessDenied.getMessage());
    }

    @ExceptionHandler(RefreshTokenNotEqualException.class)
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    protected CommonResult refreshTokenException(HttpServletRequest request, RefreshTokenNotEqualException e) {
        return responseService.getFailResult(ErrorCode.RefreshTokenNotEqualException.getCode(), ErrorCode.RefreshTokenNotEqualException.getMessage());
    }

    @ExceptionHandler(RefreshTokenExpiredException.class)
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    protected CommonResult refreshTokenException(HttpServletRequest request, RefreshTokenExpiredException e) {
        return responseService.getFailResult(ErrorCode.RefreshTokenExpiredException.getCode(), ErrorCode.RefreshTokenExpiredException.getMessage());
    }

    @ExceptionHandler(RefreshTokenNotFoundException.class)
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    protected CommonResult refreshTokenException(HttpServletRequest request, RefreshTokenNotFoundException e) {
        return responseService.getFailResult(ErrorCode.RefreshTokenNotFoundException.getCode(), ErrorCode.RefreshTokenNotFoundException.getMessage());
    }

    @ExceptionHandler(AccessTokenExpiredException.class)
    @ResponseStatus(HttpStatus.NOT_ACCEPTABLE)
    protected CommonResult accessTokenExpiredException(HttpServletRequest request, AccessTokenExpiredException e) {
        return responseService.getFailResult(ErrorCode.AccessTokenExpiredException.getCode(), ErrorCode.AccessTokenExpiredException.getMessage());
    }

    @ExceptionHandler(RecipeNotFoundException.class)
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    protected CommonResult recipeNotFoundException(HttpServletRequest request, RecipeNotFoundException e) {
        return responseService.getFailResult(ErrorCode.RecipeNotFoundException.getCode(), ErrorCode.RecipeNotFoundException.getMessage());
    }

    @ExceptionHandler(RecipeRelationalDataNotFoundException.class)
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    protected CommonResult recipeRelationalDataNotFoundException(HttpServletRequest request, RecipeRelationalDataNotFoundException e) {
        return responseService.getFailResult(ErrorCode.RecipeRelationalDataNotFoundException.getCode(), ErrorCode.RecipeRelationalDataNotFoundException.getMessage());
    }

    @ExceptionHandler(AlreadyExistIngredientException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    protected CommonResult alreadyExistIngredientException(HttpServletRequest request, AlreadyExistIngredientException e) {
        return responseService.getFailResult(ErrorCode.AlreadyExistIngredientException.getCode(), ErrorCode.AlreadyExistIngredientException.getMessage());
    }

    @ExceptionHandler(IngredientNotFoundException.class)
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    protected CommonResult ingredientNotFoundException(HttpServletRequest request, IngredientNotFoundException e) {
        return responseService.getFailResult(ErrorCode.IngredientNotFoundException.getCode(), ErrorCode.IngredientNotFoundException.getMessage());
    }

    @ExceptionHandler(NutrientDataNotFoundException.class)
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    protected CommonResult nutrientDataNotFoundException(HttpServletRequest request, NutrientDataNotFoundException e) {
        return responseService.getFailResult(ErrorCode.NutrientDataNotFoundException.getCode(), ErrorCode.NutrientDataNotFoundException.getMessage());
    }

    @ExceptionHandler(FoodNotFoundException.class)
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    protected CommonResult foodNotFoundException(HttpServletRequest request, FoodNotFoundException e) {
        return responseService.getFailResult(ErrorCode.FoodNotFoundException.getCode(), ErrorCode.FoodNotFoundException.getMessage());
    }

    @ExceptionHandler(IntakeInfoNotFoundException.class)
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    protected CommonResult intakeInfoNotFoundException(HttpServletRequest request, IntakeInfoNotFoundException e) {
        return responseService.getFailResult(ErrorCode.IntakeInfoNotFoundException.getCode(), ErrorCode.IntakeInfoNotFoundException.getMessage());
    }

    @ExceptionHandler(AlreadyEvaluatedException.class)
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    protected CommonResult alreadyDidEvaluateException(HttpServletRequest request, AlreadyEvaluatedException e) {
        return responseService.getFailResult(ErrorCode.AlreadyDidEvaluateException.getCode(), ErrorCode.AlreadyDidEvaluateException.getMessage());
    }
}
