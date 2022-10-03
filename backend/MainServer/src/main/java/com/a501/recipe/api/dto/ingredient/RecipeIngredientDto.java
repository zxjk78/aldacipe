package com.a501.recipe.api.dto.ingredient;

import com.a501.recipe.api.domain.entity.Ingredient;
import com.a501.recipe.api.domain.enums.LargeCategory;
import com.a501.recipe.api.domain.enums.SmallCategory;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class RecipeIngredientDto extends IngredientDto{

    private Float weight;

    public RecipeIngredientDto(Long id, String name, String largeCategory, String smallCategory, float weight){
        super(id, name, largeCategory, smallCategory);
        this.weight = weight;
    }

}
