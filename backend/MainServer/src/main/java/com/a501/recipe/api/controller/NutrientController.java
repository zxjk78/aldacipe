package com.a501.recipe.api.controller;

import com.a501.recipe.aop.LoginUser;
import com.a501.recipe.aop.exception.AccessDeniedException;
import com.a501.recipe.api.domain.entity.User;
import com.a501.recipe.api.dto.response.CommonResult;
import com.a501.recipe.api.dto.response.ManyResult;
import com.a501.recipe.api.service.NutrientService;
import com.a501.recipe.api.service.ResponseService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import springfox.documentation.annotations.ApiIgnore;

import java.time.LocalDate;

@RestController
@RequiredArgsConstructor
@RequestMapping("/user/{userId}/nutrient")
public class NutrientController {

    private final NutrientService nutrientService;
    private final ResponseService responseService;

    @GetMapping()
    public CommonResult getDailyNutrientInfo(@ApiIgnore @LoginUser User loginUser,
                                             @PathVariable("userId") Long userId,
                                             @RequestParam("period") String period) {
        if (!userId.equals(loginUser.getId())) throw new AccessDeniedException();
        Integer day = 0;
        if ("day".equals(period)) {
            day = 1;
        } else if ("week".equals(period)) {
            day = 7;
        } else if ("month".equals(period)) {
            day = 28;
        } else return responseService.getFailResult(400, "잘못된 조회 기간 형식");
        return responseService.getOneResult(nutrientService.getDailyNutrientInfo(loginUser,day));
    }

}