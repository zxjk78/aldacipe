package com.a501.recipe.util;

import java.time.LocalDate;

public class AgeCalculator {

    public static int getAge(LocalDate birthDay) {
        LocalDate current = LocalDate.now();
        int yearDiff = current.getYear()- birthDay.getYear();
        boolean passBirthDay = false;
        int cm = current.getMonthValue();
        int bm = birthDay.getMonthValue();
        int cd = current.getDayOfMonth();
        int bd = birthDay.getDayOfMonth();
        if(bm < cm) passBirthDay = true;
        else if(bm==cm && bd<=cd) passBirthDay = true;

        return yearDiff+(passBirthDay?0:-1);
    }
}
