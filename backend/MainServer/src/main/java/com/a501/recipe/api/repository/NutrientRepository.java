package com.a501.recipe.api.repository;

import com.a501.recipe.api.domain.entity.Nutrient;
import com.a501.recipe.api.domain.entity.User;
import com.a501.recipe.api.domain.entity.UserIntake;
import com.a501.recipe.api.domain.enums.Gender;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Repository
public interface NutrientRepository extends JpaRepository<Nutrient,String> {


    @Query("select ui from UserIntake ui join fetch ui.food f join fetch f.nutrient n" +
            " where ui.user=:user and ui.intakeType = com.a501.recipe.api.domain.enums.IntakeType.FOOD and ui.intakeDate>=:fromDate")
    Optional<List<UserIntake>> searchDailyIntakeFoodWithNutrientFrom(@Param("user") User user, @Param("fromDate") LocalDate fromDate);

    @Query("select ui from UserIntake ui join fetch ui.recipe r join fetch r.nutrient n" +
            " where ui.user=:user and ui.intakeType = com.a501.recipe.api.domain.enums.IntakeType.RECIPE and ui.intakeDate>=:fromDate")
    Optional<List<UserIntake>> searchDailyIntakeRecipeWithNutrientFrom(@Param("user") User user, @Param("fromDate") LocalDate fromDate);

    @Query("select distinct ui from UserIntake ui join fetch ui.food f join fetch f.nutrient n " +
            " where ui.user=:user and ui.intakeType = com.a501.recipe.api.domain.enums.IntakeType.FOOD and ui.intakeDate>=:fromDate")
    Optional<List<UserIntake>> searchDailyIntakeFoodWithIngredientAndNutrientFrom(@Param("user") User user, @Param("fromDate") LocalDate fromDate);

    @Query("select distinct ui from UserIntake ui " +
            " join fetch ui.recipe r" +
            " join fetch r.nutrient n" +
            " join fetch r.recipeIngredients ri" +
            " join fetch ri.ingredient i" +
            " where ui.user=:user and ui.intakeType = com.a501.recipe.api.domain.enums.IntakeType.RECIPE and ui.intakeDate>=:fromDate")
    Optional<List<UserIntake>> searchDailyIntakeRecipeWithIngredientAndNutrientFrom(@Param("user") User user, @Param("fromDate") LocalDate fromDate);

    @Query("select rn.nutrient from RecommendedIntake rn where rn.gender=:gender and rn.minAge <= :age and rn.maxAge >= :age ")
    Optional<Nutrient> searchRecommendedIntakeNutrientByUser(@Param("gender") Gender gender, @Param("age") int age);
}
