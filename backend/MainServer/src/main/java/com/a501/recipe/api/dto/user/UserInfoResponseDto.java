package com.a501.recipe.api.dto.user;

import com.a501.recipe.api.domain.enums.Gender;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UserInfoResponseDto {

    private float height;
    private float weight;
    private Gender gender;
    private LocalDate birthDay;
    private String name;

}
