package com.a501.recipe.api.dto.response;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class OneResult<T> extends CommonResult {
    private T data;
}
