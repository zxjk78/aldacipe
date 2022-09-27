package com.a501.recipe.api.dto.intake;

import lombok.Getter;

import java.time.LocalDate;

@Getter
public class IntakeUpdateRequestDto {
    private Float intakeAmount;
    private LocalDate intakeDate;
}
