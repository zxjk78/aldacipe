package com.a501.recipe.api.domain.entity;

import lombok.Getter;

import javax.persistence.Entity;

@Entity
@Getter
public class NutrientFeature extends BaseEntity{
    String name;
}
