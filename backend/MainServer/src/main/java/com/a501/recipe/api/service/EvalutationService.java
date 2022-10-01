package com.a501.recipe.api.service;

import com.a501.recipe.aop.exception.AlreadyEvaluatedException;
import com.a501.recipe.api.domain.entity.Evaluation;
import com.a501.recipe.api.domain.entity.User;
import com.a501.recipe.api.dto.evaluation.EvaluationPostRequestDto;
import com.a501.recipe.api.repository.EvaluationRepository;
import com.a501.recipe.api.repository.RecipeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class EvalutationService {

    private final EvaluationRepository evaluationRepository;
    private final RecipeRepository recipeRepository;

    @Transactional
    public void registEvaluationOnRecipe(User loginUser, Long recipeId, EvaluationPostRequestDto evaluationPostRequestDto) {
        Evaluation e = evaluationRepository.searchByUserAndRecipe(loginUser, recipeRepository.getReferenceById(recipeId))
                .orElse(null);
        if (e != null) throw new AlreadyEvaluatedException();
        Evaluation newEval = new Evaluation(evaluationPostRequestDto.getScore(),
                recipeRepository.getReferenceById(recipeId)
                , loginUser);
        evaluationRepository.save(newEval);
    }

}
