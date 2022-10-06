package com.a501.recipe.api.domain.entity;

import lombok.Getter;

import javax.persistence.*;

@Entity
@Getter
public class RecipeFeature extends BaseEntity {
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "recipe_id")
    private Recipe recipe;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "nutrient_feature_id")
    private NutrientFeature nutrientFeature;
}
