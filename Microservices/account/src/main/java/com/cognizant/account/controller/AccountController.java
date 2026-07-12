package com.cognizant.account.controller;

import com.cognizant.account.model.Account;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AccountController {
    @GetMapping("/account/{number}")
    public Account getAccount(@PathVariable String number){
        return new Account("98946","savings",100000);
    }

}
