package com.a501.recipe.api.repository;

import com.a501.recipe.api.domain.entity.Review;
import com.a501.recipe.api.dto.review.ReviewDto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ReviewRepository extends JpaRepository<Review,Long> {

    @Query("select r" +
            " from Review r " +
            " join r.user u " +
            " join r.recipe rr" +
            " where rr.id=:recipeId " +
            " order by r.createdTime desc")
    Optional<List<Review>> searchAllByRecipeIdOrderByCreatedTimeDesc(@Param("recipeId") Long recipeId);

    @Query("select r from Review r join fetch r.user where r.id=:reviewId")
    Optional<Review> searchReviewWithUserById(@Param("reviewId") Long reviewId);
}
