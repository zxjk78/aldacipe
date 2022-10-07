package com.a501.recipe.api.repository;

import com.a501.recipe.api.domain.entity.RefrigeratorIngredient;
import com.a501.recipe.api.domain.entity.User;
import com.a501.recipe.api.dto.ingredient.RefrigeratorIngredientDto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface RefrigeratorRepository extends JpaRepository<RefrigeratorIngredient,Long> {

    Optional<RefrigeratorIngredient> findByUserAndIngredientId(User loginUser, Long ingredientId);

    void deleteByUserAndIngredientId(User loginUser, Long ingredientId);

    @Query("select new com.a501.recipe.api.dto.ingredient.RefrigeratorIngredientDto(i.id, i.name, i.largeCategory, i.smallCategory, ri.weight, ri.expirationDate)" +
            " from RefrigeratorIngredient ri join ri.ingredient i where ri.user=:user")
    List<RefrigeratorIngredientDto> searchAllMyRefrigeratorIngredient(@Param("user") User user);

    List<RefrigeratorIngredient> findAllByUser(User loginUser);

    @Query("select ri from RefrigeratorIngredient ri join fetch ri.ingredient i where ri.user=:user")
    List<RefrigeratorIngredient> findAllMyRefrigeratorIngredient(@Param("user") User loginUser);
}
