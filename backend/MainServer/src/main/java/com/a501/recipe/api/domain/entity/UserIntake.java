package com.a501.recipe.api.domain.entity;

import com.a501.recipe.api.domain.enums.IntakeType;
import com.a501.recipe.api.dto.intake.IntakeUpdateRequestDto;
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
@Table(name = "user_intake")
public class UserIntake extends BaseEntity{

    @Enumerated(EnumType.STRING)
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

    private Float amount;

    private LocalDate intakeDate;

    public void updateIntakeInfo(IntakeUpdateRequestDto intakeUpdateRequestDto) {
        this.amount = intakeUpdateRequestDto.getIntakeAmount();
        this.intakeDate = intakeUpdateRequestDto.getIntakeDate();
    }
}
