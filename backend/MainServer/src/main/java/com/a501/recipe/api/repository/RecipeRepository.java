package com.a501.recipe.api.repository;

import com.a501.recipe.api.domain.entity.Recipe;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RecipeRepository extends JpaRepository<Recipe,Long> {

    @Query(nativeQuery = true, value = "SELECT * FROM recipe WHERE id IN (:ids)")
    List<Recipe> searchRecipeByIdList(@Param("ids") List<Long> idList);
}
