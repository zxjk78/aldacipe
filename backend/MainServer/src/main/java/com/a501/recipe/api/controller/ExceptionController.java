package com.a501.recipe.api.controller;

import com.a501.recipe.advice.exception.AccessDeniedException;
import com.a501.recipe.advice.exception.AccessTokenExpiredException;
import com.a501.recipe.advice.exception.AuthenticationEntryPointException;
import com.a501.recipe.api.dto.response.CommonResult;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import springfox.documentation.annotations.ApiIgnore;

@ApiIgnore
@RequiredArgsConstructor
@RestController
@RequestMapping("/exception")
public class ExceptionController {

    @GetMapping("/entryPoint")
    public CommonResult entrypointException() {
        throw new AuthenticationEntryPointException();
    }

    @GetMapping("/accessTokenExpired")
    public CommonResult accessTokenExpiredException() {
        throw new AccessTokenExpiredException();
    }

    @PostMapping("/accessTokenExpired")
    public CommonResult accessTokenExpiredPostException() {
        throw new AccessTokenExpiredException();
    }

    @PutMapping("/accessTokenExpired")
    public CommonResult accessTokenExpiredPutException() {
        throw new AccessTokenExpiredException();
    }


    @DeleteMapping("/accessTokenExpired")
    public CommonResult accessTokenExpiredDeleteException() {
        throw new AccessTokenExpiredException();
    }

    @GetMapping("/accessDenied")
    public CommonResult accessDeniedException() {
        throw new AccessDeniedException();
    }

}
