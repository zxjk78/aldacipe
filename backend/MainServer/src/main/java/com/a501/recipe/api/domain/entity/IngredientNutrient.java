package com.a501.recipe.api.domain.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "ingredient_nutrient")
public class IngredientNutrient extends BaseEntity {

    private String representative;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="nutrient_id")
    private Nutrient nutrient;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "ingredient_id")
    private Ingredient ingredient;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="ingredient_status_id")
    private IngredientStatus ingredientStatus;

}
