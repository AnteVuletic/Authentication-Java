package org.authentication.controllers;

import org.authentication.domain.Claim;
import org.authentication.domain.User;
import org.authentication.services.ClaimService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

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
}
