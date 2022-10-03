package com.a501.recipe.api.dto.intake;

import com.a501.recipe.api.domain.enums.IntakeType;
import lombok.Getter;

import java.time.LocalDate;

@Getter
public class IntakeAddRequestDto {
    private Long intakeTargetId;
    private IntakeType intakeType;
    private Float intakeAmount;
    private LocalDate intakeDate;
}
