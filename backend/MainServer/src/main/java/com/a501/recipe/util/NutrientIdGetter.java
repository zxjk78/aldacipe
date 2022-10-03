package com.a501.recipe.util;

import com.a501.recipe.api.domain.entity.Ingredient;
import com.a501.recipe.api.domain.entity.Recipe;

public class NutrientIdGetter {
    public static String getNutrientId(Class<?> type, Long id){
        if(type.equals(Recipe.class)) {
            return "r-"+getStringId(id);
        } else if(type.equals(Ingredient.class)) {
            return "i-"+getStringId(id);
        } else return "x-00000000";// It's a wrong class to get nutrient id
    }

    public static String getStringId(Long id){
        String base = ("00000000"+id);
        return base.substring(base.length()-8,base.length());
    }
}
