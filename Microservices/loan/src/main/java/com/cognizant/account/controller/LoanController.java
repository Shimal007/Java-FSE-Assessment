package com.cognizant.account.controller;

import com.cognizant.account.model.Loan;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;
@RestController
public class LoanController {

    @GetMapping("/loans/{number}")
    public Loan getLoan(@PathVariable String number) {

        return new Loan(
                "5175", "bike", 670000, 3258, 18
        );
    }
}