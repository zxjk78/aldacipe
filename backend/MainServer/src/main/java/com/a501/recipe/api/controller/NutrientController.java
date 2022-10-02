package com.a501.recipe.api.controller;

import com.a501.recipe.aop.LoginUser;
import com.a501.recipe.aop.exception.AccessDeniedException;
import com.a501.recipe.api.domain.entity.User;
import com.a501.recipe.api.dto.response.CommonResult;
import com.a501.recipe.api.dto.response.ManyResult;
import com.a501.recipe.api.service.NutrientService;
import com.a501.recipe.api.service.ResponseService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import springfox.documentation.annotations.ApiIgnore;

import java.time.LocalDate;

@Api(tags = "08. Nutrient Controller")
@RestController
@RequiredArgsConstructor
@RequestMapping("/user/{userId}/nutrient")
public class NutrientController {

    private final NutrientService nutrientService;
    private final ResponseService responseService;

    @ApiOperation(value = "월/주/일 동안 섭취한 영양분의 권장섭취량 대비 비율 정보 ")
    @ApiImplicitParam(name="period", value="month or week or day")
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

    @ApiOperation(value = "7일간 영양섭취 상세 정보")
    @GetMapping("/detail")
    public CommonResult getWeeklyNutrientDetailInfo(@ApiIgnore @LoginUser User loginUser,
                                             @PathVariable("userId") Long userId) {
        if (!userId.equals(loginUser.getId())) throw new AccessDeniedException();
        Integer day = 6;
        return responseService.getOneResult(nutrientService.getDailyNutrientDetail(loginUser,day));
    }

}