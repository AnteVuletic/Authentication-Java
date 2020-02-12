package org.authentication.controllers;

import org.authentication.datatransferobjects.AddClaimUser;
import org.authentication.datatransferobjects.TokenRole;
import org.authentication.datatransferobjects.UserEditPassword;
import org.authentication.datatransferobjects.UserFilter;
import org.authentication.domain.Claim;
import org.authentication.domain.SecurityProfile;
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
    //CREATE
    @RequestMapping(value = "/register", method = RequestMethod.POST)
    public ResponseEntity<?> Register(@RequestBody User user) {
        this.userService.addUser(user);
        return ResponseEntity.ok("Success");
    }

    //READ
    @RequestMapping(value = "/get-user-data", method = RequestMethod.GET)
    public ResponseEntity<?> getUserFromRequest(@RequestHeader("Authorization") String token) {
        String jwtToken = token.substring(7);
        String email = this.jwtService.getEmailFromToken(jwtToken);
        return ResponseEntity.ok(this.userService.findUserByEmail(email));
    }

    @RequestMapping(value = "/filter-user", method = RequestMethod.POST)
    public ResponseEntity<?> filterUser(@RequestBody UserFilter userfilter) {
        List<User> users = this.userService.findUserByContainingEmailFirstNameLastName(userfilter.email, userfilter.firstName, userfilter.lastName);
        return ResponseEntity.ok(users);
    }
    @RequestMapping(value = "/get", method = RequestMethod.GET)
    public ResponseEntity<?> getAllUsers() {
        List<User> users = this.userService.getAllUsers();
        return ResponseEntity.ok(users);
    }

    //UPDATE
    @RequestMapping(value = "/edit-user-data", method = RequestMethod.POST)
    public ResponseEntity<?> editUser(@RequestBody User user) {
        User editedUser = this.userService.updateUserDetails(user.userId, user.email, user.firstName, user.lastName);
        return ResponseEntity.ok("Ok!");
    }

    @RequestMapping(value = "/edit-user-claims", method = RequestMethod.POST)
    public ResponseEntity<?> editUserClaims(@RequestBody AddClaimUser userAndClaims) {
        this.userService.updateUserClaims(userAndClaims.user, userAndClaims.claims);

        return ResponseEntity.ok("Ok!");
    }

    @RequestMapping(value = "/change-password", method = RequestMethod.POST)
    public ResponseEntity<?> editPassword(@RequestBody UserEditPassword userEditPassword){
        this.userService.resetUserPassword(userEditPassword.userId, userEditPassword.oldPassword, userEditPassword.newPassword);
        return ResponseEntity.ok("Ok!");
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

    @RequestMapping(value = "/refresh-token", method = RequestMethod.GET)
    public ResponseEntity<String> RefreshToken(@RequestHeader("Authorization") String token) {
        String jwtToken = token.substring(7);
        String email = this.jwtService.getEmailFromToken(jwtToken);
        User user = this.userService.findUserByEmail(email);
        String tokenNew = this.jwtService.generateToken(user);
        return ResponseEntity.ok(tokenNew);
    }

    @RequestMapping(value = "/get-by-claim", method = RequestMethod.POST)
    public ResponseEntity<?> filterUser(@RequestBody Claim claim) {
        List<User> users = this.userService.getAllUsersByClaimId(claim.claimId);
        return ResponseEntity.ok(users);
    }
}
