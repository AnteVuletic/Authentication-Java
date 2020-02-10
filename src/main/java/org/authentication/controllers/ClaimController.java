package org.authentication.controllers;

import org.apache.coyote.Response;
import org.authentication.domain.Claim;
import org.authentication.domain.User;
import org.authentication.services.ClaimService;
import org.authentication.services.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/claim")
public class ClaimController {
    private final ClaimService claimService;
    private final UserService userService;

    public ClaimController(ClaimService claimService, UserService userService) {
        this.claimService = claimService;
        this.userService = userService;
    }

    @RequestMapping(value = "/create", method = RequestMethod.POST)
    public ResponseEntity<?> create(@RequestBody Claim claim) {
        this.claimService.addClaim(claim);
        return ResponseEntity.ok("Claim added");
    }

    @RequestMapping(value = "get", method = RequestMethod.GET)
    public ResponseEntity<?> Get() {
        List<Claim> claims = this.claimService.getAllClaims();
        return ResponseEntity.ok(claims);
    }

    @RequestMapping(value = "get-all-users-by-claim-id", method = RequestMethod.GET)
    public ResponseEntity<?> GetAllUsersByClaimId(@RequestParam int claimId) {
        List<User> users = this.userService.getAllUsersByClaimId(claimId);
        return ResponseEntity.ok(users);
    }

    @RequestMapping(value = "get-by-user", method = RequestMethod.GET)
    public ResponseEntity<?> GetAllClaimsByUser(@RequestParam String userId) {
        List<Claim> claims = this.claimService.getClaimsByUser(userId);
        return ResponseEntity.ok(claims);
    }
}
