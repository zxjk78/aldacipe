package com.a501.recipe.api.controller;

import com.a501.recipe.aop.LoginUser;
import com.a501.recipe.api.domain.entity.User;
import com.a501.recipe.api.dto.intake.IntakeAddRequestDto;
import com.a501.recipe.api.dto.intake.IntakeDto;
import com.a501.recipe.api.dto.intake.IntakeUpdateRequestDto;
import com.a501.recipe.api.dto.response.CommonResult;
import com.a501.recipe.api.dto.response.ManyResult;
import com.a501.recipe.api.service.IntakeService;
import com.a501.recipe.api.service.ResponseService;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import springfox.documentation.annotations.ApiIgnore;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

@RestController
@RequiredArgsConstructor
@RequestMapping("/intake")
public class IntakeController {

    private final IntakeService intakeService;
    private final ResponseService responseService;

    @ApiOperation(value = "특정 날짜 이상부터 섭취한 음식 조회")
    @GetMapping()
    public ManyResult<IntakeDto> getMyIntakeList(@ApiIgnore @LoginUser User loginUser, @RequestParam("date") String date) {
        LocalDate baseDate = LocalDate.parse(date);
        return responseService.getManyResult(intakeService.getMyIntakeList(loginUser, baseDate));
    }

    @ApiOperation(value = "섭취한 음식 추가")
    @PostMapping()
    public CommonResult addIntake(@ApiIgnore @LoginUser User loginUser,
                                  @RequestBody IntakeAddRequestDto intakeAddRequestDto) {
        intakeService.addIntake(loginUser, intakeAddRequestDto);
        return responseService.getSuccessResult();
    }

    @ApiOperation(value = "섭취한 음식 수정")
    @PutMapping("/{id}")
    public CommonResult updateIntake(@ApiIgnore @LoginUser User loginUser,
                                  @PathVariable("id") Long id,
                                  @RequestBody IntakeUpdateRequestDto intakeUpdateRequestDto) throws IllegalAccessException {
        intakeService.updateIntake(loginUser, id, intakeUpdateRequestDto);
        return responseService.getSuccessResult();
    }

    @ApiOperation(value = "섭취한 음식 삭제")
    @DeleteMapping("/{id}")
    public CommonResult updateIntake(@ApiIgnore @LoginUser User loginUser,
                                     @PathVariable("id") Long id) throws IllegalAccessException {
        intakeService.deleteIntake(loginUser, id);
        return responseService.getSuccessResult();
    }



}
