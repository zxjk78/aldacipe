package com.a501.recipe.repository;


import com.a501.recipe.entity.RefreshToken;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RefreshTokenRepository extends JpaRepository<RefreshToken, String> {

    Optional<RefreshToken> findByTokenKey(Long tokenKey);
    void deleteByTokenKey(Long tokenKey);
}
