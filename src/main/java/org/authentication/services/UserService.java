package org.authentication.services;

import org.authentication.domain.Claim;
import org.authentication.domain.SecurityProfile;
import org.authentication.domain.User;
import org.authentication.repository.ClaimRepository;
import org.authentication.repository.SecurityProfileRepository;
import org.authentication.repository.UserRepository;
import org.springframework.security.access.AuthorizationServiceException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.Collections;
import java.util.List;
import java.util.Set;
import java.util.UUID;

@Component
public class UserService implements UserDetailsService {
    private final UserRepository userRepository;
    private final SecurityProfileRepository securityProfileRepository;
    private final SecurityProfileService securityProfileService;
    private final ClaimRepository claimRepository;

    public UserService(
            UserRepository userRepository,
            SecurityProfileRepository securityProfileRepository,
            ClaimRepository claimRepository,
            SecurityProfileService securityProfileService
    ) {
        this.userRepository = userRepository;
        this.securityProfileRepository = securityProfileRepository;
        this.claimRepository = claimRepository;
        this.securityProfileService = securityProfileService;
    }

    public void addUser(User user) {
        if(this.userRepository.findByEmail(user.email) != null) return;
        BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder();
        SecurityProfile securityProfile = this.securityProfileRepository.findSecurityProfileByName("UserNotOwner");
        user.userId =  UUID.randomUUID().toString();
        user.password = bCryptPasswordEncoder.encode(user.password);
        user.securityProfile = securityProfile;
        this.userRepository.save(user);
    }

    public void updateUserClaims(User user, List<Claim> claims) {
        if (!this.securityProfileService.validateLoggedInUserIsSuperAdmin()) throw new AuthorizationServiceException("User not super admin");
        Set<Claim> claimsSet = (Set<Claim>) claims;
        user.claims = claimsSet;
        this.userRepository.save(user);
    }

    public User findUserByEmail(String email) {
        return this.userRepository.findByEmail(email);
    }

    @Override
    public UserDetails loadUserByUsername(String s) throws UsernameNotFoundException {
        User user = findUserByEmail(s);

        if (user == null) {
            throw new UsernameNotFoundException(s);
        }

        return new org.springframework.security.core.userdetails.User(user.email, user.password, Collections.emptyList());
    }
}
