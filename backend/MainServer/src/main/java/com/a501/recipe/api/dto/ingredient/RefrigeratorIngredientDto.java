package com.a501.recipe.api.dto.ingredient;

import lombok.Getter;

import java.time.LocalDate;

@Getter
public class RefrigeratorIngredientDto extends IngredientDto{
    private Float weight;
    private LocalDate expirationDate;

    public RefrigeratorIngredientDto(Long id, String name, String largeCategory, String smallCategory, float weight, LocalDate expirationDate){
        super(id, name, largeCategory, smallCategory);
        this.weight = weight;
        this.expirationDate = expirationDate;
    }
}
