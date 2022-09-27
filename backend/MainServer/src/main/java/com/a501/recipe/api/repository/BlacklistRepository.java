package com.a501.recipe.api.repository;

import com.a501.recipe.api.domain.entity.Blacklist;
import com.a501.recipe.api.domain.entity.User;
import com.a501.recipe.api.dto.ingredient.IngredientDto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface BlacklistRepository extends JpaRepository<Blacklist,Long> {
    @Query("select new com.a501.recipe.api.dto.ingredient.IngredientDto(i.id, i.name, i.largeCategory, i.smallCategory)" +
            " from Blacklist ri join ri.ingredient i where ri.user=:user")
    public Optional<List<IngredientDto>> getMyBlacklistIngredient(@Param("user") User user);


    public Optional<Blacklist> findByUserAndIngredientId(User loginUser, Long ingredientId);
}
