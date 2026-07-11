package com.cognizant.spring_learn.controller;

import com.cognizant.spring_learn.model.AuthenticationResponse;
import com.cognizant.spring_learn.util.JwtUtil;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.nio.charset.StandardCharsets;
import java.util.Base64;

@RestController
public class AuthenticationController {

    @GetMapping("/authenticate")
    public AuthenticationResponse authenticate(HttpServletRequest request) {
        System.out.println("Authentication controller called");
        // Read Authorization header
        String authorization = request.getHeader("Authorization");

        // Remove "Basic "
        String encoded = authorization.substring(6);

        // Decode Base64
        byte[] decodedBytes = Base64.getDecoder().decode(encoded);

        // Convert bytes to String
        String decoded = new String(decodedBytes, StandardCharsets.UTF_8);

        // Split username and password
        String[] credentials = decoded.split(":");

        String username = credentials[0];
        String password = credentials[1];

        // Validate credentials
        if (!username.equals("shimal") || !password.equals("shimal007")) {
            throw new RuntimeException("Invalid Credentials");
        }

        // Generate JWT
        String token = JwtUtil.generateToken(username);

        // Return JSON
        return new AuthenticationResponse(token);

    }

}