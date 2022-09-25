package com.a501.recipe.api.repository;

import com.a501.recipe.api.domain.entity.Manual;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ManualRepository extends JpaRepository<Manual,Long> {

//    Optional<List<Manual>> findAllByRecipeId(Long recipeId);
}
