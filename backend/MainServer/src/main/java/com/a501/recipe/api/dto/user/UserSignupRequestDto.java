package com.a501.recipe.api.dto.user;

import com.a501.recipe.api.domain.entity.User;
import com.a501.recipe.api.domain.enums.Gender;
import lombok.Builder;
import lombok.Getter;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.time.LocalDate;
import java.util.Collections;

@Getter
public class UserSignupRequestDto {
    private String email;
    private String password;

    private float weight;

    private float height;

    private Gender gender;

    private LocalDate birthday;

    @Builder
    public UserSignupRequestDto(String email, String password, float weight, float height, Gender gender, LocalDate birthday) {
        this.email = email;
        this.password = password;
        this.weight = weight;
        this.height = height;
        this.gender = gender;
        this.birthday = birthday;
    }

    public User toEntity(PasswordEncoder passwordEncoder) {
        return User.builder()
                .email(email)
                .password(passwordEncoder.encode(password))
                .weight(weight)
                .height(height)
                .gender(gender)
                .birthday(birthday)
                .roles(Collections.singletonList("ROLE_USER")) // security에서 검증할떄 USER
                .build();
    }
}
