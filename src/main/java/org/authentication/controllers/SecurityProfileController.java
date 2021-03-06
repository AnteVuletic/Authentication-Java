package org.authentication.controllers;

import org.authentication.datatransferobjects.UserNewProfile;
import org.authentication.domain.SecurityProfile;
import org.authentication.domain.User;
import org.authentication.services.SecurityProfileService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;

@RestController
@RequestMapping("/api/security-profile")
public class SecurityProfileController {
    private final SecurityProfileService securityProfileService;

    public SecurityProfileController(SecurityProfileService securityProfileService) {
        this.securityProfileService = securityProfileService;
    }

    //CREATE
    @RequestMapping(value = "/add", method = RequestMethod.POST)
    public ResponseEntity<SecurityProfile> add(@RequestBody SecurityProfile securityProfile) {
        SecurityProfile securityProfileDb = this.securityProfileService.addSecurityProfile(securityProfile);
        return ResponseEntity.ok(securityProfileDb);
    }

    //READ
    @RequestMapping(value = "", method = RequestMethod.GET)
    public ResponseEntity<ArrayList<SecurityProfile>> getAll() {
        ArrayList<SecurityProfile> securityProfiles = this.securityProfileService.getAllSecurityProfiles();
        return ResponseEntity.ok(securityProfiles);
    }

    @RequestMapping(value = "/get", method = RequestMethod.GET)
    public ResponseEntity<ArrayList<User>> getUsersBySecurityProfileId(@RequestParam(name = "id") String id) {
        ArrayList<User> users = this.securityProfileService.getAllUsersBySecurityProfile(Integer.parseInt(id));
        return ResponseEntity.ok(users);
    }

    //UPDATE
    @RequestMapping(value = "/edit-user", method = RequestMethod.POST)
    public ResponseEntity<?> editUser(@RequestBody UserNewProfile userNewProfile) {
        this.securityProfileService.editUserSecurityProfile(userNewProfile.user, userNewProfile.securityProfile);
        return ResponseEntity.ok("User edited");
    }
}
