package com.cognizant.spring_learn.service;

import com.cognizant.spring_learn.model.Country;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;
import org.springframework.stereotype.Service;

import java.util.*;
@Service
public class CountryService {
    public static Country getCountry(String code){
        ApplicationContext context=new ClassPathXmlApplicationContext("country.xml");
        List<Country> country=context.getBean("countryList", List.class);
        for(Country c:country){
            if(c.getCode().equalsIgnoreCase(code)){
                return c;
            }
        }
        return null;
    }
}
