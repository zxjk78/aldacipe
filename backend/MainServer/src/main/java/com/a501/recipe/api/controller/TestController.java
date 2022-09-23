package com.a501.recipe.api.controller;

import com.a501.recipe.api.dto.response.OneResult;
import com.a501.recipe.api.service.ResponseService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@Api(tags = "00. Test")
@RequiredArgsConstructor
@RestController
public class TestController {
    private final ResponseService responseService;

    @ApiOperation(value = "테스트", notes = "테스트 수행")
    @GetMapping("/test")
    public OneResult<String> test () {
        return responseService.getOneResult("Test");
    }
}
