package org.authentication.services;

import org.authentication.domain.Claim;
import org.authentication.domain.User;
import org.authentication.repository.ClaimRepository;
import org.authentication.repository.UserRepository;
import org.springframework.security.access.AuthorizationServiceException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

@Component
public class ClaimService {
    private final UserRepository userRepository;
    private final SecurityProfileService securityProfileService;
    private final ClaimRepository claimRepository;

    public ClaimService(
            UserRepository userRepository,
            SecurityProfileService securityProfileService,
            ClaimRepository claimRepository
    ) {
        this.userRepository = userRepository;
        this.securityProfileService = securityProfileService;
        this.claimRepository = claimRepository;
    }

    public void addUserClaim(Claim claim, User user) {
        if (!this.securityProfileService.validateLoggedInUserIsSuperAdmin()) throw new AuthorizationServiceException("User not super admin");
        claim.user = user;
        this.claimRepository.save(claim);
    }

    public void deleteUserClaim(Claim claim) {
        if (!this.securityProfileService.validateLoggedInUserIsSuperAdmin()) throw new AuthorizationServiceException("User not super admin");
        Claim claimDb = this.claimRepository.findByClaimId(claim.claimId);
        this.claimRepository.delete(claimDb);
    }

    public Map<String, Object> getClaims(User user) {
        ArrayList<Claim> claims = this.claimRepository.getAllByUser(user);
        Map<String, Object> map = new HashMap<>();
        claims.forEach(claim -> {
            map.put("resourceId", claim.resourceId);
        });
        return map;
    }

    public boolean hasClaimByUserId(String resourceId, String userId) {
        return this.claimRepository.existsClaimsByResourceIdAndUser_UserId(resourceId, userId);
    }
}
