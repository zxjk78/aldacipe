package com.a501.recipe.api.service;

import com.a501.recipe.aop.exception.UserNotFoundException;
import com.a501.recipe.api.domain.entity.User;
import com.a501.recipe.api.dto.user.UserInfoResponseDto;
import com.a501.recipe.api.dto.user.UserInfoUpdateRequestDto;
import com.a501.recipe.api.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class UserService {

    private final UserRepository userRepository;

    public UserInfoResponseDto getUserInfo(User user) {
        User foundUser = userRepository.findById(user.getId()).orElseThrow(UserNotFoundException::new);
        return UserInfoResponseDto.builder().
                weight(foundUser.getWeight()).
                height(foundUser.getHeight()).
                gender(foundUser.getGender()).
                birthDay(foundUser.getBirthday()).
                build();
    }

    @Transactional
    public void modifyUserInfo(User loginUser, UserInfoUpdateRequestDto userInfoUpdateRequestDto) {
        User user = userRepository.findById(loginUser.getId()).orElseThrow(UserNotFoundException::new);
        user.updateUserInfo(userInfoUpdateRequestDto.getHeight(),userInfoUpdateRequestDto.getWeight());
    }
}
