package org.authentication.services;

import org.authentication.domain.SecurityProfile;
import org.authentication.domain.User;
import org.authentication.repository.SecurityProfileRepository;
import org.authentication.repository.UserRepository;
import org.springframework.security.access.AuthorizationServiceException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import java.util.ArrayList;

@Component
public class SecurityProfileService {
    private final UserRepository userRepository;
    private final SecurityProfileRepository securityProfileRepository;

    public SecurityProfileService (
            UserRepository userRepository,
            SecurityProfileRepository securityProfileRepository
    ) {
        this.userRepository = userRepository;
        this.securityProfileRepository = securityProfileRepository;
    }

    public boolean validateLoggedInUserIsSuperAdmin() {
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        String email;
        if (principal instanceof UserDetails) {
            email = ((UserDetails)principal).getUsername();
        } else {
            email = principal.toString();
        }
        return this.userRepository.countAllBySecurityProfile_NameAndEmail("SuperAdmin", email) != 0;
    }

    public ArrayList<User> getAllUsersBySecurityProfile(int securityProfileId) {
        if (!this.validateLoggedInUserIsSuperAdmin()) throw new AuthorizationServiceException("User not super admin");
        ArrayList<User> users = this.userRepository.getAllBySecurityProfile_SecurityProfileId(securityProfileId);
        users.forEach(user -> {user.securityProfile.users = null; user.userClaims = null; user.password = null;});
        return users;
    }

    public ArrayList<SecurityProfile> getAllSecurityProfiles() {
        if (!this.validateLoggedInUserIsSuperAdmin()) throw new AuthorizationServiceException("User not super admin");
        ArrayList<SecurityProfile> securityProfiles = (ArrayList<SecurityProfile>) this.securityProfileRepository.findAll();
        securityProfiles.forEach(securityProfile -> {securityProfile.users = null;});
        return securityProfiles;
    }

    public void editUserSecurityProfile(User user, SecurityProfile securityProfile) {
        if (!this.validateLoggedInUserIsSuperAdmin()) throw new AuthorizationServiceException("User not super admin");
        user.securityProfile = securityProfile;
        this.userRepository.save(user);
    }

    public SecurityProfile addSecurityProfile(SecurityProfile securityProfile) {
        if (!this.validateLoggedInUserIsSuperAdmin()) throw new AuthorizationServiceException("User not super admin");
        return this.securityProfileRepository.save(securityProfile);
    }
}
