package com.a501.recipe.api.repository;

import com.a501.recipe.api.domain.entity.Ingredient;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IngredientRepository extends JpaRepository<Ingredient,Long> {

}
