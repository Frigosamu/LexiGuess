package com.backend.config;

import java.security.Key;

import org.springframework.stereotype.Component;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;

@Component
public class JwtUtil {
    private static final String SECRET = "super-secreto-muy-largo-para-firmar-jwt-lexiguess-1234567890";
    private final Key key = Keys.hmacShaKeyFor(SECRET.getBytes());

    public String generateToken(String username) {
        return Jwts.builder()
            .setSubject(username)
            .signWith(key)
            .compact();
    }

    public String extractUsername(String token) {
        Claims claims = Jwts.parserBuilder().setSigningKey(key).build()
            .parseClaimsJws(token)
            .getBody();
        return claims.getSubject();
    }

    public boolean validate(String token) {
        try {
            extractUsername(token);
            return true;
        } catch (Exception ex) {
            return false;
        }
    }
}
