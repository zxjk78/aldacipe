package com.a501.recipe.aop.exception;

public class RefreshTokenNotEqualException extends RuntimeException{
    public RefreshTokenNotEqualException() {
        super();
    }

    public RefreshTokenNotEqualException(String message) {
        super(message);
    }

    public RefreshTokenNotEqualException(String message, Throwable cause) {
        super(message, cause);
    }
}
