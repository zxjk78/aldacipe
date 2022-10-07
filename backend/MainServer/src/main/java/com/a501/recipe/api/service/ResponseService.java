package com.a501.recipe.api.service;

import com.a501.recipe.api.domain.entity.Evaluation;
import com.a501.recipe.api.domain.entity.User;
import com.a501.recipe.api.dto.response.CommonResult;
import com.a501.recipe.api.dto.response.ManyResult;
import com.a501.recipe.api.dto.response.OneResult;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class ResponseService {
    // 단일 건 조회 처리
    public <T> OneResult<T> getOneResult(T data) {
        OneResult<T> result = new OneResult<>();
        result.setData(data);
        setSuccessResult(result);
        return result;
    }

    // 여러 건 조회 처리
    public <T> ManyResult<T> getManyResult(List<T> list) {
        ManyResult<T> result = new ManyResult<>();
        result.setData(list);
        setSuccessResult(result);
        return result;
    }

    // 단순 성공 처리
    public CommonResult getSuccessResult() {
        CommonResult result = new CommonResult();
        setSuccessResult(result);
        return result;
    }

    // 단일 실패 처리
    public CommonResult getFailResult(int code, String message) {
        CommonResult result = new CommonResult();
        setFailResult(result, code, message);
        return result;
    }

    // API 호출이 성공일 때 데이터 설정
    private void setSuccessResult(CommonResult result) {
        result.setSuccess(true);
        result.setCode(0);
        result.setMessage("호출 성공");
    }

    // API 호출이 실패일 때 데이터 설정
    private void setFailResult(CommonResult result, int code, String message) {
        result.setSuccess(false);
        result.setCode(code);
        result.setMessage(message);
    }


}

