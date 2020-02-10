package org.authentication.controllers;

import org.authentication.datatransferobjects.AddClaimUser;
import org.authentication.datatransferobjects.TokenRole;
import org.authentication.datatransferobjects.UserEditPassword;
import org.authentication.datatransferobjects.UserFilter;
import org.authentication.domain.SecurityProfile;
import org.authentication.domain.User;
import org.authentication.services.JWTService;
import org.authentication.services.UserService;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

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
    public ResponseEntity Authenticate(@RequestBody User user) {
        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(user.email, user.password, new ArrayList<>()));
        } catch (DisabledException e) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("User disabled");
        } catch(BadCredentialsException e) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Invalid user name or password");
        }

        User userDb = this.userService.findUserByEmail(user.email);
        String token = this.jwtService.generateToken(userDb);
        TokenRole tokenRole = new TokenRole(token, userDb.securityProfile.name);
        return ResponseEntity.ok(tokenRole);
    }

    @RequestMapping(value = "/filter-user", method = RequestMethod.POST)
    public ResponseEntity<?> filterUser(@RequestBody UserFilter userfilter) {
        List<User> users = this.userService.findUserByContainingEmailFirstNameLastName(userfilter.email, userfilter.firstName, userfilter.lastName);
        return ResponseEntity.ok(users);
    }

    @RequestMapping(value = "/edit-user", method = RequestMethod.POST)
    public ResponseEntity<?> editUser(@RequestBody User user) {
        this.userService.updateUserDetails(user.userId, user.email, user.firstName, user.lastName);
        return ResponseEntity.ok("Ok!");
    }

    @RequestMapping(value = "/edit-user-claim", method = RequestMethod.POST)
    public ResponseEntity<?> editUserClaim(@RequestBody AddClaimUser userAndClaims) {
        this.userService.updateUserClaims(userAndClaims.user, userAndClaims.claims);

        return ResponseEntity.ok("Ok!");
    }

    @RequestMapping(value = "/edit-password", method = RequestMethod.POST)
    public ResponseEntity<?> editPassword(@RequestBody UserEditPassword userEditPassword){
        this.userService.resetUserPassword(userEditPassword.userId, userEditPassword.oldPassword, userEditPassword.newPassword);

        return ResponseEntity.ok("Ok!");
    }

    @RequestMapping(value = "/refresh-token", method = RequestMethod.GET)
    public ResponseEntity<String> RefreshToken(@RequestHeader("Authorization") String token) {
        String jwtToken = token.substring(7);
        String email = this.jwtService.getEmailFromToken(jwtToken);
        User user = this.userService.findUserByEmail(email);
        String tokenNew = this.jwtService.generateToken(user);
        return ResponseEntity.ok(tokenNew);
    }
}
