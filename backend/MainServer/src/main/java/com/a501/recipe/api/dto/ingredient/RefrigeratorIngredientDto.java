package com.a501.recipe.api.dto.ingredient;

import lombok.Getter;

@Getter
public class RefrigeratorIngredientDto extends IngredientDto{
    private Float weight;

    public RefrigeratorIngredientDto(Long id, String name, String largeCategory, String smallCategory, float weight){
        super(id, name, largeCategory, smallCategory);
        this.weight = weight;
    }
}
