package com.a501.recipe.api.dto.review;

import com.a501.recipe.api.domain.entity.User;
import com.a501.recipe.api.dto.user.ReviewUserDto;
import lombok.Getter;

import java.util.List;

@Getter
public class ReviewDto {
    private Long id;
    private ReviewUserDto user;
    private String contents;
    private List<String> imageList;

    public ReviewDto(Long id, User user, String contents) {
        this.id = id;
        this.user = new ReviewUserDto(user);
        this.contents = contents;
//        this.imageList = imageList;
    }
}
