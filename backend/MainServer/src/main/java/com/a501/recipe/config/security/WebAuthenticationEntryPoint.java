package com.a501.recipe.config.security;

import com.a501.recipe.aop.exception.advice.ErrorCode;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Component
public class WebAuthenticationEntryPoint implements AuthenticationEntryPoint {
    @Override
    public void commence(HttpServletRequest request, HttpServletResponse response, AuthenticationException authException) throws IOException, ServletException {
        Integer exception = (Integer)request.getAttribute("exception");
        if (exception != null && exception == ErrorCode.AccessTokenExpiredException.getCode()) {
            response.sendRedirect("https://j7a501.p.ssafy.io/api/exception/accessTokenExpired");
            // local
            // response.sendRedirect("/exception/accessTokenExpired");
        }
        else {
            response.sendRedirect("https://j7a501.p.ssafy.io/api/exception/entryPoint");
            // local
            // response.sendRedirect("/exception/entryPoint");
        }
    }
}
