package com.a501.recipe.api.repository;

import com.a501.recipe.api.domain.entity.Nutrient;
import com.a501.recipe.api.domain.entity.Recipe;
import com.a501.recipe.api.dto.ingredient.IngredientDto;
import com.a501.recipe.api.dto.nutrient.NutrientDto;
import com.a501.recipe.api.dto.nutrient.RecipeNutrientDto;
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


    // name query
    @Query("select new com.a501.recipe.api.dto.recipe.RecipeDto(r)" +
            " from Recipe r where r.name like :keyword%")
    Optional<List<RecipeDto>> searchRecipeByNameLike(@Param("keyword") String keyword);
    Optional<List<Recipe>> findRecipeByNameLike(String keyword);
    @Query("select distinct new com.a501.recipe.api.dto.recipe.RecipeDto(r)" +
            " from Recipe r join r.recipeIngredients ri where r.name like :keyword% and ri.id in (:ingredientIdList)")
    Optional<List<RecipeDto>> searchRecipeByNameLikeAndIngredients(@Param("keyword") String keyword, @Param("ingredientIdList") List<Long> ingredientIdList);
    @Query("select distinct r from Recipe r join fetch r.recipeIngredients ri join fetch ri.ingredient i where r.name like :keyword%")
    Optional<List<Recipe>> searchByRecipeByNameLikeWithIngredient(String keyword);



    @Query("select distinct r" +
            " from Recipe r" +
            " join fetch r.nutrient n" +
            " join fetch r.manuals m" +
            " where r.id=(:id)")
    Optional<Recipe> searchRecipeWithNutrientAndManualById(@Param("id") Long id);

    @Query("select r from Recipe r join fetch r.nutrient n where r.id=:id")
    Optional<Recipe> searchRecipeWithNutrientById(@Param("id") Long id);

}
