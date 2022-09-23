package com.a501.recipe.api.repository;

import com.a501.recipe.api.domain.entity.Nutrient;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface NutrientRepository extends JpaRepository<Nutrient,Long> {

}
