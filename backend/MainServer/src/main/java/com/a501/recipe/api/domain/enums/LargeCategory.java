package com.a501.recipe.api.domain.enums;

import com.fasterxml.jackson.annotation.JsonFormat;

@JsonFormat(shape = JsonFormat.Shape.OBJECT)
public enum LargeCategory {

    GrainAndVegetable("곡류 및 채소"),
    Meat("육류"),
    Seafood("수산물"),
    Dairy("유제품"),
    Drink("음료"),
    SeasoningAndOil("조미료 및 기름"),
    Other("기타");

    final private String name;
    private LargeCategory(String name) {
        this.name = name;
    }

    public String getName(){
        return this.name;
    }

    public static LargeCategory nameOf(String name) {
        for (LargeCategory largeCategory : LargeCategory.values()) {
            if (largeCategory.getName().equals(name)) {
                return largeCategory;
            }
        }
        return null;
    }

}
