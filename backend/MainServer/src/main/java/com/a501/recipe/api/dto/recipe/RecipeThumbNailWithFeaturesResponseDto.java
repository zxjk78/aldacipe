package com.a501.recipe.api.dto.recipe;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Setter
public class RecipeThumbNailWithFeaturesResponseDto {

    private Long id;
    private String name;
    private String imgURL;
    private List<String> features;

}
