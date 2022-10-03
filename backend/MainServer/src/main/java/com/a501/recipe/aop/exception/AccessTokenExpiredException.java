package com.a501.recipe.aop.exception;

public class AccessTokenExpiredException extends RuntimeException{
    public AccessTokenExpiredException() {
    }

    public AccessTokenExpiredException(String message) {
        super(message);
    }

    public AccessTokenExpiredException(String message, Throwable cause) {
        super(message, cause);
    }
}
