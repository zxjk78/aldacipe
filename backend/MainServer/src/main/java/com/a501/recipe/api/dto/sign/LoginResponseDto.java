package com.a501.recipe.api.dto.sign;

import com.a501.recipe.api.dto.token.AccessTokenResponseDto;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class LoginResponseDto {

    private Long userId;
    private AccessTokenResponseDto tokenData;

}
