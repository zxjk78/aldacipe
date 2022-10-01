package com.a501.recipe.api.dto.evaluation;

import com.a501.recipe.api.domain.entity.Evaluation;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class EvaluationDto {

    private Integer score;
    private Long userId;
    private String userName;

    public EvaluationDto(Evaluation evaluation){
        this.score = evaluation.getScore();
        this.userId = evaluation.getUser().getId();
        this.userName = evaluation.getUser().getName();
    }
}
