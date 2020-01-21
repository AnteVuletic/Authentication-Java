package org.authentication.services;

import org.authentication.domain.Claim;
import org.authentication.domain.User;
import org.authentication.repository.ClaimRepository;
import org.authentication.repository.UserRepository;
import org.springframework.security.access.AuthorizationServiceException;
import org.springframework.stereotype.Component;

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
}
