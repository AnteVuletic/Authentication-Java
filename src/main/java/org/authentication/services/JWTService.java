package org.authentication.services;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.authentication.domain.Claim;
import org.authentication.domain.User;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.Date;
import java.util.Map;

@Component
public class JWTService {
    private final ClaimService claimService;
    public static final long JWT_TOKEN_VALIDITY = 60 * 60 * 24 * 2;
    // Seconds * Minutes * Hours * Days

    public JWTService(ClaimService claimService) {
        this.claimService = claimService;
    }

    @Value("${jwt.secret}")
    private String secret;

    private Date getExpirationDateFromToken(String token) {
        Claims claims = getAllClaimsFromToken(token);
        return claims.getExpiration();
    }

    private boolean isTokenExpired(String token) {
        Date expiration = getExpirationDateFromToken(token);
        return expiration.before(new Date());
    }

    public String generateToken(User user) {
        Map<String, Object> map = this.claimService.getClaims(user);
        return Jwts.builder()
                .setClaims(map)
                .setSubject(user.email)
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + JWT_TOKEN_VALIDITY * 1000))
                .signWith(SignatureAlgorithm.HS512, secret)
                .compact();
    }

    public boolean validateToken(String token, UserDetails client) {
        String email = getAllClaimsFromToken(token).getSubject();
        return (email.equals(client.getUsername()) && !isTokenExpired(token));
    }

    public String getEmailFromToken(String token) {
        Claims body = getAllClaimsFromToken(token);
        String email = body.getSubject();
        return email;
    }

    private Claims getAllClaimsFromToken(String token) {
        return Jwts.parser().setSigningKey(secret).parseClaimsJws(token).getBody();
    }
}
