package org.authentication.controllers;

import org.authentication.domain.UserClaim;
import org.authentication.services.UserClaimService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/user-claim")
public class UserClaimController {
    private final UserClaimService userClaimService;

    public UserClaimController(UserClaimService userClaimService) {
        this.userClaimService = userClaimService;
    }

    @RequestMapping(value = "/delete", method = RequestMethod.POST)
    public ResponseEntity<?> deleteUserClaim(@RequestBody UserClaim userClaim) {
        this.userClaimService.DeleteUserClaim(userClaim);
        return ResponseEntity.ok("success");
    }

    @RequestMapping(value = "/add", method = RequestMethod.POST)
    public ResponseEntity<?> addUserClaim(@RequestBody UserClaim userClaim) {
        UserClaim added = this.userClaimService.AddUserClaim(userClaim);
        return ResponseEntity.ok(added);
    }
}
