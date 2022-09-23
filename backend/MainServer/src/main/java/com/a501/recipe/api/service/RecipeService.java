package com.a501.recipe.api.service;

import com.a501.recipe.api.dto.recipe.RecipeResponseDto;
import com.a501.recipe.api.repository.RecipeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class RecipeService {

    private final RecipeRepository recipeRepository;
    public List<RecipeResponseDto> getPopularRecipeList() {

        // make random id list -> 24시간 동안 가장 평점이 좋은 레시피 쿼리 제작
        Set<Long> idSet = new HashSet<>();
        Long maxId = 1000l;
        while(idSet.size()<10) {
            idSet.add(((int) (Math.random() * 1000) % maxId) + 1);
        }
        List<Long> idList = new ArrayList<>();
        for(Long id : idSet){
            idList.add(id);
        }

        // search recipes by id list
        return recipeRepository.searchRecipeByIdList(idList).stream()
                .map(r -> new RecipeResponseDto(r))
                .collect(Collectors.toList());
    }

    public List<RecipeResponseDto> getCookableRecipeList() {

        // make random id list -> 로그인 유저의 냉장고 식재료 리스트가 전부 포함된 요리 쿼리 제작
        Set<Long> idSet = new HashSet<>();
        Long maxId = 1000l;
        while(idSet.size()<10) {
            idSet.add(((int) (Math.random() * 1000) % maxId) + 1);
        }
        List<Long> idList = new ArrayList<>();
        for(Long id : idSet){
            idList.add(id);
        }

        // search recipes by id list
        return recipeRepository.searchRecipeByIdList(idList).stream()
                .map(r -> new RecipeResponseDto(r))
                .collect(Collectors.toList());
    }

    public List<RecipeResponseDto> getLikableRecipeList() {

        // make random id list -> CF 알고리즘 레시피 id 리스트 결과로 대체
        Set<Long> idSet = new HashSet<>();
        Long maxId = 1000l;
        while(idSet.size()<10) {
            idSet.add(((int) (Math.random() * 1000) % maxId) + 1);
        }
        List<Long> idList = new ArrayList<>();
        for(Long id : idSet){
            idList.add(id);
        }

        // search recipes by id list
        return recipeRepository.searchRecipeByIdList(idList).stream()
                .map(r -> new RecipeResponseDto(r))
                .collect(Collectors.toList());
    }
}
