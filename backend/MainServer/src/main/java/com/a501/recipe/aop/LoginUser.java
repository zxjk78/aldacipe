package com.a501.recipe.aop;
import springfox.documentation.annotations.ApiIgnore;

import java.lang.annotation.*;

@Documented
@Retention(value = RetentionPolicy.RUNTIME)
@Target(ElementType.PARAMETER)
public @interface LoginUser {

}