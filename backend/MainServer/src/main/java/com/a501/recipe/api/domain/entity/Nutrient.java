package com.a501.recipe.api.domain.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "nutrient")
public class Nutrient{
    @Id
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
    @Column(name="vitamin_d")
    private float vitaminD;
    @Column(name="vitamin_e")
    private float vitaminE;
    @Column(name="vitamin_k")
    private float vitaminK;
    private float niacin;
    private float pantothenicAcid;
    @Column(name="vitamin_b6")
    private float vitaminB6;
    private float biotin;
    private float folicAcid;
    @Column(name="vitamin_b12")
    private float vitaminB12;
    @Column(name="vitamin_c")
    private float vitaminC;
    private float cholesterol;
    @Column(name="omega3_fatty_acids")
    private float omega3FattyAcids;
    private float transFattyAcid;

    public Nutrient(Nutrient nutrient){
        this.id = nutrient.getId();
        this.kcal = nutrient.getKcal();
        this.moisture = nutrient.getMoisture();
        this.protein = nutrient.getProtein();
        this.fat = nutrient.getFat();
        this.carbohydrate = nutrient.getCarbohydrate();
        this.sugar = nutrient.getSugar();
        this.dietaryFiber = nutrient.getDietaryFiber();
        this.calcium = nutrient.getCalcium();
        this.iron = nutrient.getIron();
        this.magnesium = nutrient.getMagnesium();
        this.phosphorus = nutrient.getPhosphorus();
        this.potassium = nutrient.getPotassium();
        this.sodium = nutrient.getSodium();
        this.zinc = nutrient.getZinc();
        this.copper = nutrient.getCopper();
        this.manganese = nutrient.getManganese();
        this.selenium = nutrient.getSelenium();
        this.molybdenum = nutrient.getMolybdenum();
        this.iodine = nutrient.getIodine();
        this.vitaminD = nutrient.getVitaminD();
        this.vitaminE = nutrient.getVitaminE();
        this.vitaminK = nutrient.getVitaminK();
        this.niacin = nutrient.getNiacin();
        this.pantothenicAcid = nutrient.getPantothenicAcid();
        this.vitaminB6 = nutrient.getVitaminB6();
        this.biotin = nutrient.getBiotin();
        this.folicAcid = nutrient.getFolicAcid();
        this.vitaminB12 = nutrient.getVitaminB12();
        this.vitaminC = nutrient.getVitaminC();
        this.cholesterol = nutrient.getCholesterol();
        this.omega3FattyAcids = nutrient.getOmega3FattyAcids();
        this.transFattyAcid = nutrient.getTransFattyAcid();
    }
}
