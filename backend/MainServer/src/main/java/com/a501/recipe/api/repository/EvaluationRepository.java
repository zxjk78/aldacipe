package com.a501.recipe.api.repository;

import com.a501.recipe.api.domain.entity.Evaluation;
import com.a501.recipe.api.domain.entity.Recipe;
import com.a501.recipe.api.domain.entity.User;
import com.a501.recipe.api.dto.evaluation.EvaluationDto;
import com.a501.recipe.api.dto.evaluation.UserEvaluationInfoDto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface EvaluationRepository extends JpaRepository<Evaluation,Long> {

    @Query("select new com.a501.recipe.api.dto.evaluation.EvaluationDto(e.score, u.id, u.name)" +
            " from Evaluation e join e.user u where e.recipe=(:recipe)")
    Optional<List<EvaluationDto>> searchAllByRecipe(@Param("recipe") Recipe recipe);

    @Query("select e from Evaluation e where user=:user and recipe=:recipe")
    Optional<Evaluation> searchByUserAndRecipe(@Param("user") User user, @Param("recipe") Recipe recipe);

}
