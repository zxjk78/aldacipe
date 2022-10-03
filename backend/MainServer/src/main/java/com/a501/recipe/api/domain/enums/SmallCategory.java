package com.a501.recipe.api.domain.enums;

import com.fasterxml.jackson.annotation.JsonFormat;

@JsonFormat(shape = JsonFormat.Shape.OBJECT)
public enum SmallCategory {

    GrainAndProduct("곡류 및 가공품"),
    PotatoAndStarch("감자 및 전분류"),
    Bean("두류"),
    NutAndSeed("견과류 및 종실류"),
    Vegetable("채소류"),
    Mushroom("버섯류"),
    Fruit("과실류"),
    Seaweed("해조류"),
    Meat("육류"),
    Egg("난류"),
    Seafood("수산물"),
    MilkAndDairy("우유 및 유제품류"),
    Tea("차류"),
    Drink("음료류"),
    Alcohol("주류"),
    Sugar("당류"),
    Seasoning("조미료류"),
    FatAndOil("유지류"),
    Other("기타");


    final private String name;
    private SmallCategory(String name) {
        this.name = name;
    }

    public String getName(){
        return this.name;
    }

    public static SmallCategory nameOf(String name) {
        for (SmallCategory smallCategory : SmallCategory.values()) {
            if (smallCategory.getName().equals(name)) {
                return smallCategory;
            }
        }
        return null;
    }

}