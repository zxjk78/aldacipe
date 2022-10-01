package com.a501.recipe.api.controller;

import com.a501.recipe.aop.LoginUser;
import com.a501.recipe.api.domain.entity.User;
import com.a501.recipe.api.dto.evaluation.EvaluationPostRequestDto;
import com.a501.recipe.api.dto.response.CommonResult;
import com.a501.recipe.api.service.EvalutationService;
import com.a501.recipe.api.service.ResponseService;
import io.swagger.annotations.Api;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import springfox.documentation.annotations.ApiIgnore;

@Api(tags = "10. Evaluation Controller")
@RestController
@RequiredArgsConstructor
@RequestMapping("/recipe/{recipeId}/evaluation")
public class EvaluationController {

    private final EvalutationService evalutationService;
    private final ResponseService responseService;

    @PostMapping()
    public CommonResult registEvalutation(@ApiIgnore @LoginUser User loginUser,
                                          @PathVariable("recipeId") Long recipeId,
                                          @RequestBody EvaluationPostRequestDto evaluationPostRequestDto) {
        evalutationService.registEvaluationOnRecipe(loginUser,recipeId, evaluationPostRequestDto);
        return responseService.getSuccessResult();
    }

}
