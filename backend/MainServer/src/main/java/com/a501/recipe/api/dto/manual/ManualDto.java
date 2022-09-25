package com.a501.recipe.api.dto.manual;

import com.a501.recipe.api.domain.entity.Manual;
import lombok.Getter;

@Getter
public class ManualDto {
    private int order;
    private String instruction;
    private String image;

    public ManualDto(Manual manual){
        this.order = manual.getRecipeOrder();
        this.instruction = manual.getInstruction();
        this.image = manual.getImage();
    }
}
