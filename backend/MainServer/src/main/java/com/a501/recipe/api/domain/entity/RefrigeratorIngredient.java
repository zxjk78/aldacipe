package com.a501.recipe.api.domain.entity;

import com.a501.recipe.api.dto.refrigerator.RefrigeratorUpdateRequestDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDate;

@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "refrigerator_ingredient")
public class RefrigeratorIngredient extends BaseEntity{

    private float weight;

    private LocalDate expirationDate;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "ingredient_id")
    private Ingredient ingredient;

    public void updateInfo(RefrigeratorUpdateRequestDto refrigeratorUpdateRequestDto) {
        this.expirationDate=refrigeratorUpdateRequestDto.getExpirationDate();
        this.weight= refrigeratorUpdateRequestDto.getWeight();
    }
}
