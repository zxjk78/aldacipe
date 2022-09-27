package com.a501.recipe.api.service;

import com.a501.recipe.aop.exception.AlreadyExistIngredientException;
import com.a501.recipe.aop.exception.IngredientNotFoundException;
import com.a501.recipe.api.domain.entity.Blacklist;
import com.a501.recipe.api.domain.entity.Ingredient;
import com.a501.recipe.api.domain.entity.User;
import com.a501.recipe.api.dto.ingredient.IngredientDto;
import com.a501.recipe.api.repository.BlacklistRepository;
import com.a501.recipe.api.repository.IngredientRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class BlacklistService {

    private final BlacklistRepository blackListRepository;
    private final IngredientRepository ingredientRepository;


    public List<IngredientDto> getMyBlacklistIngredient(User loginUser) {
        return blackListRepository.getMyBlacklistIngredient(loginUser)
                .orElseThrow(IngredientNotFoundException::new);
    }

    @Transactional
    public void addBlacklistIngredient(User loginUser, Long ingredientId) {
        Blacklist blackListItem = blackListRepository.findByUserAndIngredientId(loginUser, ingredientId)
                .orElse(null);
        if (blackListItem != null) throw new AlreadyExistIngredientException();
        // 새로운 재료 추가
        Ingredient blacklistItemToInsert = ingredientRepository.findById(ingredientId)
                .orElseThrow(IngredientNotFoundException::new);
        Blacklist newBlacklistIngredient = Blacklist.builder()
                .ingredient(blacklistItemToInsert)
                .user(loginUser)
                .build();
        blackListRepository.save(newBlacklistIngredient);
    }

    @Transactional
    public void deleteBlacklistIngredient(User loginUser, Long ingredientId) {
        Blacklist blacklistItemToDelete = blackListRepository.findByUserAndIngredientId(loginUser, ingredientId)
                .orElseThrow(IngredientNotFoundException::new);
        blackListRepository.delete(blacklistItemToDelete);
    }
}
