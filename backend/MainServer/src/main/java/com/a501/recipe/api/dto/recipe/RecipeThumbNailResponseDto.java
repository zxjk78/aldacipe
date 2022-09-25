package com.a501.recipe.api.dto.recipe;

import com.a501.recipe.api.domain.entity.Recipe;
import lombok.Getter;

@Getter
public class RecipeThumbNailResponseDto {

    private Long id;
    private String name;
    private String imgURL;
    private float avgScore;

    public RecipeThumbNailResponseDto(Recipe recipe){
        this.id = recipe.getId();
        this.name = recipe.getName();
        this.avgScore = (float)(Math.round(Math.random()/2*100))/10;
//        this.imgURL = recipe.getImageBig();
        this.imgURL = "rand_img_"+(int)(((Math.random()*10)%5)+1)+".jpg";
    }
}
