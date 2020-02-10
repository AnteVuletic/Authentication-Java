package org.authentication.services;

import org.authentication.domain.Claim;
import org.authentication.domain.User;
import org.authentication.domain.UserClaim;
import org.authentication.repository.ClaimRepository;
import org.authentication.repository.UserClaimRepository;
import org.authentication.repository.UserRepository;
import org.springframework.security.access.AuthorizationServiceException;
import org.springframework.stereotype.Component;

import java.util.*;

@Component
public class ClaimService {
    private final UserClaimRepository userClaimRepository;
    private final SecurityProfileService securityProfileService;
    private final ClaimRepository claimRepository;
    private final UserRepository userRepository;

    public ClaimService(
            UserClaimRepository userClaimRepository,
            SecurityProfileService securityProfileService,
            ClaimRepository claimRepository,
            UserRepository userRepository
    ) {
        this.userClaimRepository = userClaimRepository;
        this.securityProfileService = securityProfileService;
        this.claimRepository = claimRepository;
        this.userRepository = userRepository;
    }

    public List<Claim> getClaimByUser(String userId) {
        Optional<User> user = this.userRepository.findById(userId);
        ArrayList<Claim> claims = new ArrayList<>();
        user.get().getUserClaims().forEach(userClaim -> {
            claims.add(userClaim.claim);
        });

        return claims;
    }

    public List<Claim> getAllClaims() {
        List<Claim> allClaims = (List<Claim>) this.claimRepository.findAll();
        allClaims.forEach(claim -> {claim.claims = null;});
        return allClaims;
    }

    public Map<String, Object> getClaims(User user) {
        ArrayList<UserClaim> userClaims = (ArrayList<UserClaim>) this.userClaimRepository.findAllByUser_UserId(user.userId);
        Map<String, Object> map = new HashMap<>();
        userClaims.forEach(userClaim -> {
            map.put(userClaim.claim.name, userClaim.claim.claimId);
        });
        return map;
    }

    public List<Claim> getClaimsByUser(String userId) {
        ArrayList<UserClaim> userClaims = (ArrayList<UserClaim>) this.userClaimRepository.findAllByUser_UserId(userId);
        List<Claim> claims = new ArrayList<Claim>();
        userClaims.forEach(userClaim -> {
            userClaim.user.userClaims = null;
            userClaim.user.securityProfile = null;
            userClaim.claim.claims = null;
            claims.add(userClaim.claim);
        });
        return claims;
    }

    public void addClaim(Claim claim) {
        if (!this.securityProfileService.validateLoggedInUserIsSuperAdmin()) throw new AuthorizationServiceException("User not super admin");
        this.claimRepository.save(claim);
    }
}
