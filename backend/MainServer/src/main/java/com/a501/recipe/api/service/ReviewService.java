package com.a501.recipe.api.service;

import com.a501.recipe.aop.exception.AccessDeniedException;
import com.a501.recipe.aop.exception.RecipeRelationalDataNotFoundException;
import com.a501.recipe.api.domain.entity.Review;
import com.a501.recipe.api.domain.entity.User;
import com.a501.recipe.api.dto.review.ReviewDto;
import com.a501.recipe.api.dto.review.ReviewPostRequestDto;
import com.a501.recipe.api.repository.RecipeRepository;
import com.a501.recipe.api.repository.ReviewRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class ReviewService {

    private final ReviewRepository reviewRepository;
    private final RecipeRepository recipeRepository;

    public List<ReviewDto> getAllReviewByRecipeId(Long recipeId) {
        return reviewRepository.searchAllByRecipeIdOrderByCreatedTimeDesc(recipeId)
                .orElseThrow(RecipeRelationalDataNotFoundException::new);
    }

    @Transactional
    public void postReviewOnRecipe(User user, Long recipeId, ReviewPostRequestDto reviewPostRequestDto) {
        Review newReview = Review.builder()
                .user(user)
                .recipe(recipeRepository.getReferenceById(recipeId))
                .contents(reviewPostRequestDto.getContents())
                .build();
        reviewRepository.save(newReview);
    }

    @Transactional
    public void deleteReviewOnRecipe(User loginUser, Long reviewId) {
        Review reviewToDelete = reviewRepository.searchReviewWithUserById(reviewId)
                .orElseThrow(RecipeRelationalDataNotFoundException::new);
        if(!loginUser.getId().equals(reviewToDelete.getUser().getId())) throw new AccessDeniedException();
        reviewRepository.delete(reviewToDelete);
    }
}
