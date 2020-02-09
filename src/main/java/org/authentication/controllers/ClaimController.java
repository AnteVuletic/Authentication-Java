package org.authentication.controllers;

import org.authentication.datatransferobjects.AddClaimUser;
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
    public ResponseEntity<?> add(@RequestBody Claim claim) {
        this.claimService.addClaim(claim);
        return ResponseEntity.ok("Claim added");
    }

    @RequestMapping(value = "get", method = RequestMethod.GET)
    public ResponseEntity<?> Get(@RequestParam(name = "id") String id) {
        ArrayList<Claim> claims = this.claimService.getClaimByUser(id);
        return ResponseEntity.ok(claims);
    }
}
