package com.a501.recipe.api.dto.nutrient;

import com.a501.recipe.api.domain.entity.Nutrient;
import lombok.Getter;

import javax.persistence.Column;

@Getter
public class NutrientDto {
    private String id;
    private float kcal;
    private float moisture;
    private float protein;
    private float fat;
    private float carbohydrate;
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
    private float molybdenum;
    private float iodine;
    private float vitaminD;
    private float vitaminE;
    private float vitaminK;
    private float niacin;
    private float pantothenicAcid;
    private float vitaminB6;
    private float biotin;
    private float folicAcid;
    private float vitaminB12;
    private float vitaminC;
    private float cholesterol;
    private float omega3FattyAcids;
    private float transFattyAcid;

    public NutrientDto(Nutrient n) {
        this.id = n.getId();
        this.kcal = n.getKcal();
        this.moisture = n.getMoisture();
        this.protein = n.getProtein();
        this.fat = n.getFat();
        this.carbohydrate = n.getCarbohydrate();
        this.sugar = n.getSugar();
        this.dietaryFiber = n.getDietaryFiber();
        this.calcium = n.getCalcium();
        this.iron = n.getIron();
        this.magnesium = n.getMagnesium();
        this.phosphorus = n.getPhosphorus();
        this.potassium = n.getPotassium();
        this.sodium = n.getSodium();
        this.zinc = n.getZinc();
        this.copper = n.getCopper();
        this.manganese = n.getManganese();
        this.selenium = n.getSelenium();
        this.molybdenum = n.getMolybdenum();
        this.iodine = n.getIodine();
        this.vitaminD = n.getVitaminD();
        this.vitaminE = n.getVitaminE();
        this.vitaminK = n.getVitaminK();
        this.niacin = n.getNiacin();
        this.pantothenicAcid = n.getPantothenicAcid();
        this.vitaminB6 = n.getVitaminB6();
        this.biotin = n.getBiotin();
        this.folicAcid = n.getFolicAcid();
        this.vitaminB12 = n.getVitaminB12();
        this.vitaminC = n.getVitaminC();
        this.cholesterol = n.getCholesterol();
        this.omega3FattyAcids = n.getOmega3FattyAcids();
        this.transFattyAcid = n.getTransFattyAcid();
    }
}