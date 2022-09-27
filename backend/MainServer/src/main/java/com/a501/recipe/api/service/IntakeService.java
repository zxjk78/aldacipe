package com.a501.recipe.api.service;

import com.a501.recipe.aop.exception.FoodNotFoundException;
import com.a501.recipe.aop.exception.IntakeInfoNotFoundException;
import com.a501.recipe.aop.exception.RecipeNotFoundException;
import com.a501.recipe.api.domain.entity.Food;
import com.a501.recipe.api.domain.entity.Recipe;
import com.a501.recipe.api.domain.entity.User;
import com.a501.recipe.api.domain.entity.UserIntake;
import com.a501.recipe.api.domain.enums.IntakeType;
import com.a501.recipe.api.dto.intake.IntakeAddRequestDto;
import com.a501.recipe.api.dto.intake.IntakeDto;
import com.a501.recipe.api.dto.intake.IntakeUpdateRequestDto;
import com.a501.recipe.api.repository.IntakeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class IntakeService {

    private final IntakeRepository intakeRepository;

    @Transactional
    public void addIntake(User loginUser, IntakeAddRequestDto intakeAddRequestDto) {
        Food intakeFood = null;
        Recipe intakeRecipe = null;
        IntakeType intakeType = intakeAddRequestDto.getIntakeType();
        Long intakeTargetId = intakeAddRequestDto.getIntakeTargetId();
        if (IntakeType.FOOD.equals(intakeType)) {
            intakeFood = intakeRepository.searchFoodById(intakeTargetId).orElseThrow(FoodNotFoundException::new);
        } else if (IntakeType.RECIPE.equals(intakeType)) {
            intakeRecipe = intakeRepository.searchRecipeById(intakeTargetId).orElseThrow(RecipeNotFoundException::new);
        }
        UserIntake newUserIntake = UserIntake.builder()
                .user(loginUser)
                .intakeType(intakeAddRequestDto.getIntakeType())
                .food(intakeFood)
                .recipe(intakeRecipe)
                .amount(intakeAddRequestDto.getIntakeAmount())
                .intakeDate(intakeAddRequestDto.getIntakeDate())
                .build();
        intakeRepository.save(newUserIntake);
    }

    public List<IntakeDto> getMyIntakeList(User loginUser, LocalDate baseDate) {
        List<IntakeDto> intakeList = new ArrayList<>();

        intakeRepository.searchAllIntakeFoodByUser(loginUser, baseDate)
                .orElseThrow(IntakeInfoNotFoundException::new)
                .stream()
                .forEach(userIntake->{
                    intakeList.add(new IntakeDto(userIntake));
                });
        intakeRepository.searchAllIntakeRecipeByUser(loginUser, baseDate)
                .orElseThrow(IntakeInfoNotFoundException::new)
                .stream()
                .forEach(userIntake->{
                    intakeList.add(new IntakeDto(userIntake));
                });
        intakeList.sort((i1,i2)->i1.getIntakeDate().compareTo(i2.getIntakeDate()));
        return intakeList;
    }

    @Transactional
    public void updateIntake(User loginUser, Long id, IntakeUpdateRequestDto intakeUpdateRequestDto) throws IllegalAccessException {
        UserIntake userIntakeToUpdate = intakeRepository.searchIntakeWithUserById(id).orElseThrow(IntakeInfoNotFoundException::new);
        if(!userIntakeToUpdate.getUser().getId().equals(loginUser.getId())) throw new IllegalAccessException();
        userIntakeToUpdate.updateIntakeInfo(intakeUpdateRequestDto);
    }

    @Transactional
    public void deleteIntake(User loginUser, Long id) throws IllegalAccessException{
        UserIntake userIntakeToDelete = intakeRepository.searchIntakeWithUserById(id).orElseThrow(IntakeInfoNotFoundException::new);
        if(!userIntakeToDelete.getUser().getId().equals(loginUser.getId())) throw new IllegalAccessException();
        intakeRepository.delete(userIntakeToDelete);
    }
}
