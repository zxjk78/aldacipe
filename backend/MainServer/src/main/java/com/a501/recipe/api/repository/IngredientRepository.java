package com.a501.recipe.api.repository;

import com.a501.recipe.api.domain.entity.Ingredient;
import com.a501.recipe.api.domain.entity.Recipe;
import com.a501.recipe.api.domain.entity.User;
import com.a501.recipe.api.dto.ingredient.IngredientDto;
import com.a501.recipe.api.dto.ingredient.RecipeIngredientDto;
import com.a501.recipe.api.dto.ingredient.RefrigeratorIngredientDto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface IngredientRepository extends JpaRepository<Ingredient, Long> {

    @Query("select new com.a501.recipe.api.dto.ingredient.RecipeIngredientDto(i.id, i.name, i.largeCategory, i.smallCategory, ri.weight)" +
                " from RecipeIngredient ri join ri.ingredient i where ri.recipe=(:recipe)")
    Optional<List<RecipeIngredientDto>> searchIngredientByRecipe(@Param("recipe") Recipe recipe);

    @Query("select new com.a501.recipe.api.dto.ingredient.RefrigeratorIngredientDto(i.id, i.name, i.largeCategory, i.smallCategory, ri.weight)" +
            " from RefrigeratorIngredient ri join ri.ingredient i where ri.user=(:user) and i.id in (:idList)")
    Optional<List<RefrigeratorIngredientDto>> searchRecipeIngredientUserHas(@Param("user") User user, @Param("idList") List<Long> idList );
}
