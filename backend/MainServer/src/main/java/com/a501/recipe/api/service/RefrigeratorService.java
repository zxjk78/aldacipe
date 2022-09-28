package com.a501.recipe.api.service;

import com.a501.recipe.aop.exception.AlreadyExistIngredientException;
import com.a501.recipe.aop.exception.IngredientNotFoundException;
import com.a501.recipe.api.domain.entity.Ingredient;
import com.a501.recipe.api.domain.entity.RefrigeratorIngredient;
import com.a501.recipe.api.domain.entity.User;
import com.a501.recipe.api.dto.ingredient.RefrigeratorIngredientDto;
import com.a501.recipe.api.dto.refrigerator.RefrigeratorInsertRequestDto;
import com.a501.recipe.api.dto.refrigerator.RefrigeratorUpdateRequestDto;
import com.a501.recipe.api.repository.IngredientRepository;
import com.a501.recipe.api.repository.RefrigeratorRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class RefrigeratorService {

    private final RefrigeratorRepository refrigeratorRepository;
    private final IngredientRepository ingredientRepository;

    public List<RefrigeratorIngredientDto> getMyRefrigeratorIngredient(User loginUser) {
        return refrigeratorRepository.searchAllMyRefrigeratorIngredient(loginUser);
    }

    @Transactional
    public void insertIngredient(User loginUser, Long ingredientId, RefrigeratorInsertRequestDto refrigeratorInsertRequestDto) {
        RefrigeratorIngredient myIngredient = refrigeratorRepository.findByUserAndIngredientId(loginUser, ingredientId)
                .orElse(null);
        if (myIngredient != null) throw new AlreadyExistIngredientException();
        // 새로운 재료 추가
        Ingredient ingredientToInsert = ingredientRepository.findById(ingredientId)
                .orElseThrow(IngredientNotFoundException::new);
        RefrigeratorIngredient newIngredient = RefrigeratorIngredient.builder()
                .ingredient(ingredientToInsert)
                .expirationDate(refrigeratorInsertRequestDto.getExpirationDate())
                .user(loginUser)
                .weight(refrigeratorInsertRequestDto.getWeight())
                .build();
        refrigeratorRepository.save(newIngredient);
    }

    @Transactional
    public void deleteIngredient(User loginUser, Long ingredientId) {
        RefrigeratorIngredient ingredientToDelete = refrigeratorRepository.findByUserAndIngredientId(loginUser,ingredientId)
                .orElseThrow(IngredientNotFoundException::new);
        refrigeratorRepository.delete(ingredientToDelete);
    }

    @Transactional
    public void updateIngredient(User loginUser, Long ingredientId, RefrigeratorUpdateRequestDto refrigeratorUpdateRequestDto) {
        RefrigeratorIngredient ri = refrigeratorRepository.findByUserAndIngredientId(loginUser, ingredientId)
                .orElseThrow(IngredientNotFoundException::new);
        ri.updateInfo(refrigeratorUpdateRequestDto);
    }




}
