package com.a501.recipe.api.dto.intake;

import com.a501.recipe.api.domain.entity.UserIntake;
import com.a501.recipe.api.domain.enums.IntakeType;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class IntakeDto {
    private Long id;
    private IntakeType intakeType;
    private Long intakeTargetId;
    private String name;
    private String image;
    private Float originalWeight;
    private Float intakeAmount;
    private LocalDate intakeDate;

    public IntakeDto(UserIntake userIntake) {
        IntakeType intakeType = userIntake.getIntakeType();
        this.id = userIntake.getId();
        this.intakeType = intakeType;
        if (IntakeType.FOOD.equals(intakeType)) {
            this.intakeTargetId = userIntake.getFood().getId();
            this.name = userIntake.getFood().getName();
            this.originalWeight = userIntake.getFood().getWeight();
            this.image = userIntake.getFood().getImage();
        } else if (IntakeType.RECIPE.equals(intakeType)) {
            this.intakeTargetId = userIntake.getRecipe().getId();
            this.name = userIntake.getRecipe().getName();
            this.originalWeight = userIntake.getRecipe().getWeight();
            this.image = userIntake.getRecipe().getImageBig();
        }
        this.intakeAmount = userIntake.getAmount();
        this.intakeDate = userIntake.getIntakeDate();
    }
}
