package com.a501.recipe.entity;

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



}
