package com.a501.recipe.api.domain.entity;

import com.a501.recipe.api.domain.enums.Gender;
import com.a501.recipe.api.domain.enums.RecommendedNutrientType;
import lombok.Getter;

import javax.persistence.*;

@Entity
@Getter
public class RecommendedIntake extends BaseEntity{

    @Enumerated(EnumType.STRING)
    private Gender gender;

    private Integer minAge;
    private Integer maxAge;
    @Enumerated(EnumType.STRING)
    private RecommendedNutrientType type;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="nutrient_id")
    private Nutrient nutrient;
}
