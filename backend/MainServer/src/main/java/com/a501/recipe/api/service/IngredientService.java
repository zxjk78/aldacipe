package com.a501.recipe.api.service;

import com.a501.recipe.advice.exception.IngredientNotFoundException;
import com.a501.recipe.api.dto.ingredient.IngredientDto;
import com.a501.recipe.api.repository.IngredientRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class IngredientService {

    private final IngredientRepository ingredientRepository;

    public List<IngredientDto> searchIngredientByNameLike(String keyword) {
        return ingredientRepository.searchIngredientByNameLike(keyword)
                .orElseThrow(IngredientNotFoundException::new);
    }
}
