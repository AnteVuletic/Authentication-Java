package org.authentication.controllers;

import org.authentication.domain.Claim;
import org.authentication.domain.User;
import org.authentication.services.ClaimService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;

@RestController
@RequestMapping("/api/claim")
public class ClaimController {
    private final ClaimService claimService;

    public ClaimController(ClaimService claimService) {
        this.claimService = claimService;
    }

    @RequestMapping(value = "/add", method = RequestMethod.POST)
    public ResponseEntity<?> add(@RequestBody Claim claim, @RequestBody User user) {
        this.claimService.addUserClaim(claim, user);
        return ResponseEntity.ok("Claim added");
    }

    @RequestMapping(value = "/delete", method = RequestMethod.POST)
    public ResponseEntity<?> delete(@RequestBody Claim claim) {
        this.claimService.deleteUserClaim(claim);
        return ResponseEntity.ok("Claim deleted");
    }

    @RequestMapping(value = "/check-has-claim")
    public ResponseEntity<?> CheckHasClaim(@RequestBody Claim claim) {
        boolean hasClaim = this.claimService.hasClaimByUserId(claim.resourceId, claim.user.userId);
        return ResponseEntity.ok(hasClaim);
    }

    @RequestMapping(value = "get", method = RequestMethod.GET)
    public ResponseEntity<?> Get(@RequestParam(name = "id") String id) {
        ArrayList<Claim> claims = this.claimService.getClaimByUser(id);
        return ResponseEntity.ok(claims);
    }
}
