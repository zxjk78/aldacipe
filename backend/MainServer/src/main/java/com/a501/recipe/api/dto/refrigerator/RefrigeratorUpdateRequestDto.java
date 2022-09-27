package com.a501.recipe.api.dto.refrigerator;

import lombok.Getter;

import java.time.LocalDate;

@Getter
public class RefrigeratorUpdateRequestDto {
    private float weight;
    private LocalDate expirationDate;
}
