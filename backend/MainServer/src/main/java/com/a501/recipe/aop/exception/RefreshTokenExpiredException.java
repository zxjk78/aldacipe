package com.a501.recipe.aop.exception;

public class RefreshTokenExpiredException extends RuntimeException{
    public RefreshTokenExpiredException() {
    }

    public RefreshTokenExpiredException(String message) {
        super(message);
    }

    public RefreshTokenExpiredException(String message, Throwable cause) {
        super(message, cause);
    }
}
