package com.a501.recipe.api.domain.entity;

import javax.persistence.*;

@Entity
public class RecipeFeature extends BaseEntity {
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "recipe_id")
    private Recipe recipe;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "nutrient_feature_id")
    private NutrientFeature nutrientFeature;
}
