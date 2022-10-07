package com.a501.recipe.api.controller;

import com.a501.recipe.aop.exception.AccessDeniedException;
import com.a501.recipe.aop.LoginUser;
import com.a501.recipe.api.domain.entity.User;
import com.a501.recipe.api.dto.response.CommonResult;
import com.a501.recipe.api.dto.response.OneResult;
import com.a501.recipe.api.dto.user.UserInfoResponseDto;
import com.a501.recipe.api.dto.user.UserInfoUpdateRequestDto;
import com.a501.recipe.api.service.ResponseService;
import com.a501.recipe.api.service.UserService;
import io.swagger.annotations.Api;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import springfox.documentation.annotations.ApiIgnore;

@Api(tags = "02. User Controller")
@RestController
@RequiredArgsConstructor
@RequestMapping("/user")
public class UserController {

    private final UserService userService;
    private final ResponseService responseService;

    @GetMapping("/{userId}/userinfo")
    public OneResult<UserInfoResponseDto> getMyProfile(@ApiIgnore @LoginUser User loginUser,
                                                       @PathVariable("userId") Long userId) {
        if (!userId.equals(loginUser.getId())) throw new AccessDeniedException();
        return responseService.getOneResult(userService.getUserInfo(loginUser));
    }

    @PutMapping("/{userId}/userinfo")
    public CommonResult modifyMyProfile(@ApiIgnore @LoginUser User loginUser,
                                        @PathVariable("userId") Long userId,
                                        @RequestBody UserInfoUpdateRequestDto userInfoUpdateRequestDto) {
        if (!userId.equals(loginUser.getId())) throw new AccessDeniedException();
        userService.modifyUserInfo(loginUser, userInfoUpdateRequestDto);

        return responseService.getSuccessResult();
    }

}
