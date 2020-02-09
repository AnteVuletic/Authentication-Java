package org.authentication.services;

import org.authentication.domain.Claim;
import org.authentication.domain.User;
import org.authentication.repository.ClaimRepository;
import org.authentication.repository.UserClaimRepository;
import org.authentication.repository.UserRepository;
import org.springframework.security.access.AuthorizationServiceException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Component
public class ClaimService {
    private final UserClaimRepository userClaimRepository;
    private final SecurityProfileService securityProfileService;
    private final ClaimRepository claimRepository;

    public ClaimService(
            UserClaimRepository userClaimRepository,
            SecurityProfileService securityProfileService,
            ClaimRepository claimRepository
    ) {
        this.userClaimRepository = userClaimRepository;
        this.securityProfileService = securityProfileService;
        this.claimRepository = claimRepository;
    }

    public ArrayList<Claim> getClaimByUser(String userId) {
        return this.claimRepository.getAllByUser_UserId(userId);
    }

    public Map<String, Object> getClaims(User user) {
        ArrayList<Claim> claims = this.claimRepository.getAllByUser_UserId(user.userId);
        Map<String, Object> map = new HashMap<>();
        claims.forEach(claim -> {
            map.put("name", claim.name);
        });
        return map;
    }

    public void addClaim(Claim claim) {
        if (!this.securityProfileService.validateLoggedInUserIsSuperAdmin()) throw new AuthorizationServiceException("User not super admin");
        this.claimRepository.save(claim);
    }
}
