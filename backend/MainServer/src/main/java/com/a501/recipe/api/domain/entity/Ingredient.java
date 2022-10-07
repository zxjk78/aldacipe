package com.a501.recipe.api.domain.entity;

import com.a501.recipe.api.domain.enums.LargeCategory;
import com.a501.recipe.api.domain.enums.SmallCategory;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "ingredient")
public class Ingredient extends BaseEntity{

    private String name;

//    @Enumerated(EnumType.STRING)
//    private LargeCategory largeCategory;
    private String largeCategory;

//    @Enumerated(EnumType.STRING)
//    private SmallCategory smallCategory;
    private String smallCategory;


    @OneToMany(mappedBy = "ingredient", cascade = CascadeType.ALL)
    private List<IngredientNutrient> ingredientNutrients = new ArrayList<>();

    @OneToMany(mappedBy = "ingredient", cascade = CascadeType.ALL)
    private List<RecipeIngredient> recipeIngredients = new ArrayList<>();


}
