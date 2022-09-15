package com.a501.recipe.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.Table;

@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "nutrient")
public class Nutrient extends BaseEntity{

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



}
