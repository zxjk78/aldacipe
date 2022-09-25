package com.a501.recipe.api.dto.evaluation;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class UserEvaluationInfoDto {
    private boolean didEvaluate;
    private int score;
}
