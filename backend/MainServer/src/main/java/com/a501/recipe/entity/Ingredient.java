package com.a501.recipe.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "ingredient")
public class Ingredient extends BaseEntity{

    private String name;

    //private LargeCategory largeCategory;
    private String largeCategory;

    //private SmallCategory smallCategory;
    private String smallCategory;


    @OneToMany(mappedBy = "ingredient", cascade = CascadeType.ALL)
    private List<IngredientNutrient> ingredientNutrients = new ArrayList<>();

    @OneToMany(mappedBy = "ingredient", cascade = CascadeType.ALL)
    private List<RecipeIngredient> recipeIngredients = new ArrayList<>();


}
