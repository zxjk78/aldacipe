package com.a501.recipe.api.dto.nutrient;

import com.a501.recipe.api.domain.entity.Nutrient;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class MajorNutrientDto {

    private float kcal;
    private float carbohydrate;
    private float protein;
    private float fat;
    private float sugar;
    private float dietaryFiber;
    private float calcium;
    private float iron;
    private float magnesium;
    private float phosphorus;
    private float potassium;
    private float sodium;
    private float zinc;
    private float copper;
    private float manganese;
    private float selenium;
    private float vitaminD;
    private float vitaminE;
    private float vitaminK;
    private float vitaminB6;
    private float vitaminB12;
    private float vitaminC;

    public MajorNutrientDto(Nutrient n, float ratio) {
        this.kcal=n.getKcal() * ratio;
        this.carbohydrate=n.getCarbohydrate() * ratio;
        this.protein=n.getProtein() * ratio;
        this.fat=n.getFat() * ratio;
        this.sugar=n.getSugar() * ratio;
        this.dietaryFiber=n.getDietaryFiber() * ratio;
        this.calcium=n.getCalcium() * ratio;
        this.iron=n.getIron() * ratio;
        this.magnesium=n.getMagnesium() * ratio;
        this.phosphorus=n.getPhosphorus() * ratio;
        this.potassium=n.getPotassium() * ratio;
        this.sodium=n.getSodium() * ratio;
        this.zinc=n.getZinc() * ratio;
        this.copper=n.getCopper() * ratio;
        this.manganese=n.getManganese() * ratio;
        this.selenium=n.getSelenium() * ratio;
        this.vitaminD=n.getVitaminD() * ratio;
        this.vitaminE=n.getVitaminE() * ratio;
        this.vitaminK=n.getVitaminK() * ratio;
        this.vitaminB6=n.getVitaminB6() * ratio;
        this.vitaminB12=n.getVitaminB12() * ratio;
        this.vitaminC=n.getVitaminC() * ratio;
    }

    public void addNutrient(MajorNutrientDto n) {
        this.kcal+=n.getKcal();
        this.carbohydrate+=n.getCarbohydrate();
        this.protein+=n.getProtein();
        this.fat+=n.getFat();
        this.sugar+=n.getSugar();
        this.dietaryFiber+=n.getDietaryFiber();
        this.calcium+=n.getCalcium();
        this.iron+=n.getIron();
        this.magnesium+=n.getMagnesium();
        this.phosphorus+=n.getPhosphorus();
        this.potassium+=n.getPotassium();
        this.sodium+=n.getSodium();
        this.zinc+=n.getZinc();
        this.copper+=n.getCopper();
        this.manganese+=n.getManganese();
        this.selenium+=n.getSelenium();
        this.vitaminD+=n.getVitaminD();
        this.vitaminE+=n.getVitaminE();
        this.vitaminK+=n.getVitaminK();
        this.vitaminB6+=n.getVitaminB6();
        this.vitaminB12+=n.getVitaminB12();
        this.vitaminC+=n.getVitaminC();
    }

}
