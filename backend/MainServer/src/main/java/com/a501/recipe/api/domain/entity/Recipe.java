package com.a501.recipe.api.domain.entity;

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
@Table(name = "recipe")
public class Recipe extends BaseEntity{

    private String name;

    private String imageBig;

    private String imageSmall;

    private float weight;

    @OneToMany(mappedBy = "recipe", cascade = CascadeType.ALL)
    private List<RecipeIngredient> recipeIngredients = new ArrayList<>();

    @OneToOne
    @JoinColumn(name="nutrient_id")
    private Nutrient nutrient;

    @OneToMany(mappedBy = "recipe", cascade = CascadeType.ALL)
    private List<Manual> manuals = new ArrayList<>();

    @OneToMany(mappedBy = "recipe", cascade = CascadeType.ALL)
    private List<Evaluation> evaluations = new ArrayList<>();


}
