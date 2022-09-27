package com.a501.recipe.api.dto.recipe;

import com.a501.recipe.api.domain.entity.Recipe;
import lombok.Getter;

@Getter
public class RecipeDto {

    private Long id;
    private String name;
    private String image;
    private Float weight;

    public RecipeDto(Recipe recipe){
        this.id = recipe.getId();
        this.name = recipe.getName();
        this.image = recipe.getImageBig();
        this.weight = recipe.getWeight();
    }
}
