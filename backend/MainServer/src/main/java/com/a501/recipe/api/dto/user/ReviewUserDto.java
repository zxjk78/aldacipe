package com.a501.recipe.api.dto.user;

import com.a501.recipe.api.domain.entity.User;
import lombok.Getter;

@Getter
public class ReviewUserDto {
    private Long id;
    private String name;

    public ReviewUserDto(User user) {
        this.id = user.getId();
        this.name = user.getName();
    }
}
