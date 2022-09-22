package com.a501.recipe.entity;

import com.a501.recipe.enums.IntakeType;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "user_intake")
public class UserIntake extends BaseEntity{

    private IntakeType intakeType;

    @OneToOne
    @JoinColumn(name = "food_id")
    private Food food;

    @OneToOne
    @JoinColumn(name = "recipe_id")
    private Recipe recipe;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

}
