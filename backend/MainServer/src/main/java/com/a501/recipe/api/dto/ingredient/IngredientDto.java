package com.a501.recipe.api.dto.ingredient;

import com.a501.recipe.api.domain.entity.Ingredient;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class IngredientDto {
    private Long id;
    private String name;
    private String largeCategory;
    private String smallCategory;

    public IngredientDto(Ingredient i) {
        this.id = i.getId();
        this.name = i.getName();
        this.largeCategory = i.getLargeCategory();
        this.smallCategory = i.getSmallCategory();
    }
}
