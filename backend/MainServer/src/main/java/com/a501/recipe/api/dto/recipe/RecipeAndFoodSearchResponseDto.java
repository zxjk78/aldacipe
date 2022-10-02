package com.a501.recipe.api.dto.recipe;

import com.a501.recipe.api.domain.entity.Food;
import com.a501.recipe.api.domain.entity.Recipe;
import lombok.Getter;

@Getter
public class RecipeAndFoodSearchResponseDto {

    private String type;
    private Long id;
    private String name;
    private String image;
    private Float weight;

    public RecipeAndFoodSearchResponseDto(Recipe recipe){
        this.type = "RECIPE";
        this.id = recipe.getId();
        this.name = recipe.getName();
        this.image = recipe.getImageBig();
        this.weight = recipe.getWeight();
    }

    public RecipeAndFoodSearchResponseDto(Food food){
        this.type = "FOOD";
        this.id = food.getId();
        this.name = food.getName();
        this.image = "";
        this.weight = food.getWeight();
    }
}
