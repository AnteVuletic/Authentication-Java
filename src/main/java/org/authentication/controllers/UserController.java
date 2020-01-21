package org.authentication.controllers;

import org.authentication.domain.User;
import org.authentication.services.JWTService;
import org.authentication.services.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;

@RestController
@RequestMapping("/api/user")
public class UserController {
    private final UserService userService;
    private final JWTService jwtService;
    private final AuthenticationManager authenticationManager;

    public UserController(
            UserService userService,
            JWTService jwtService,
            AuthenticationManager authenticationManager
    ) {
        this.userService = userService;
        this.jwtService = jwtService;
        this.authenticationManager = authenticationManager;
    }

    @RequestMapping(value = "/register", method = RequestMethod.POST)
    public ResponseEntity<?> Register(@RequestBody User user) {
        this.userService.addUser(user);
        return ResponseEntity.ok("Success");
    }

    @RequestMapping(value = "/authenticate", method = RequestMethod.POST)
    public ResponseEntity<?> Authenticate(@RequestBody User user) {
        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(user.email, user.password, new ArrayList<>()));
        } catch (DisabledException e) {
            ResponseEntity.BodyBuilder response = ResponseEntity.status(HttpStatus.FORBIDDEN);
            response.body("User disabled");
            return (ResponseEntity<?>) response;
        } catch(BadCredentialsException e) {
            ResponseEntity.BodyBuilder response = ResponseEntity.status(HttpStatus.FORBIDDEN);
            response.body("Invalid email or password");
            return (ResponseEntity<?>) response;
        }

        User userDb = this.userService.findUserByEmail(user.email);
        String token = this.jwtService.generateToken(userDb);
        return ResponseEntity.ok(token);
    }

    @RequestMapping(value = "/refresh-token", method = RequestMethod.GET)
    public ResponseEntity<String> RefreshToken(@RequestParam(name = "token") String token) {
        String email = this.jwtService.getEmailFromToken(token);
        User user = this.userService.findUserByEmail(email);
        String tokenNew = this.jwtService.generateToken(user);
        return ResponseEntity.ok(tokenNew);
    }
}
