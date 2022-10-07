package com.a501.recipe.api.dto.review;

import com.a501.recipe.api.domain.entity.User;
import com.a501.recipe.api.dto.user.ReviewUserDto;
import lombok.Getter;

import java.time.LocalDateTime;
import java.util.List;

@Getter
public class ReviewDto {
    private Long id;
    private ReviewUserDto user;
    private String contents;
    private List<String> imageList;
    private LocalDateTime regTime;

    public ReviewDto(Long id, User user, String contents, LocalDateTime regTime) {
        this.id = id;
        this.user = new ReviewUserDto(user);
        this.contents = contents;
        this.regTime = regTime;
//        this.imageList = imageList;
    }
}
