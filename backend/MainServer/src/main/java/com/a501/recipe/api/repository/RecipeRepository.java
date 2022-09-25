package com.a501.recipe.api.repository;

import com.a501.recipe.api.domain.entity.Recipe;
import com.a501.recipe.api.dto.recipe.RecipeDetailPageResponseDto;
import com.a501.recipe.api.dto.recipe.RecipeDto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface RecipeRepository extends JpaRepository<Recipe,Long> {

    @Query("select r from Recipe r where id in (:ids)")
    List<Recipe> searchRecipeByIdList(@Param("ids") List<Long> idList);

//    @Query("select distinct new com.a501.recipe.api.dto.recipe.RecipeDetailPageResponseDto(r)" +
//            " from Recipe r" +
//            " join r.nutrient n" +
//            " join r.manuals m" +
//            " join r.recipeIngredients ri join ri.ingredient i" +
//            " where r.id=(:id)")
//    Optional<RecipeDetailPageResponseDto> searchRecipeDetailById(@Param("id") Long id);

    @Query("select distinct r" +
            " from Recipe r" +
            " join fetch r.nutrient n" +
            " join fetch r.manuals m" +
            " where r.id=(:id)")
    Optional<Recipe> searchRecipeWithNutrientAndManualById(@Param("id") Long id);

}
