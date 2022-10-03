package com.a501.recipe.api.repository;

import com.a501.recipe.api.domain.entity.Food;
import com.a501.recipe.api.domain.entity.Recipe;
import com.a501.recipe.api.domain.entity.User;
import com.a501.recipe.api.domain.entity.UserIntake;
import com.a501.recipe.api.domain.enums.IntakeType;
import com.a501.recipe.api.dto.intake.IntakeDto;
import com.a501.recipe.api.dto.response.ManyResult;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Repository
public interface IntakeRepository extends JpaRepository<UserIntake, Long> {

    @Query("select ui from UserIntake ui where ui.id=:id")
    Optional<UserIntake> searchIntakeWithUserById(@Param("id") Long id);

    @Query("select f from Food f where f.id=:foodId")
    Optional<Food> searchFoodById(@Param("foodId") Long intakeTargetId);

    @Query("select r from Recipe r where r.id=:recipeId")
    Optional<Recipe> searchRecipeById(@Param("recipeId") Long intakeTargetId);

    @Query("select ui from UserIntake ui join fetch ui.food " +
            " where ui.user=:user and ui.intakeDate>=:baseDate and ui.intakeType=com.a501.recipe.api.domain.enums.IntakeType.FOOD ")
    Optional<List<UserIntake>> searchAllIntakeFoodByUser(@Param("user") User loginUser, @Param("baseDate") LocalDate date);

    @Query("select ui from UserIntake ui join fetch ui.recipe " +
            " where ui.user=:user and ui.intakeDate>=:baseDate and ui.intakeType=com.a501.recipe.api.domain.enums.IntakeType.RECIPE ")
    Optional<List<UserIntake>> searchAllIntakeRecipeByUser(@Param("user") User loginUser, @Param("baseDate") LocalDate date);



}
