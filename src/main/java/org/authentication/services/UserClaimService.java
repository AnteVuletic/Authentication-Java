package org.authentication.services;

import org.authentication.domain.UserClaim;
import org.authentication.repository.UserClaimRepository;

import org.springframework.security.access.AuthorizationServiceException;
import org.springframework.stereotype.Component;

@Component
public class UserClaimService {
    private final UserClaimRepository userClaimRepository;
    private final SecurityProfileService securityProfileService;

    public UserClaimService(
            UserClaimRepository userClaimRepository,
            SecurityProfileService securityProfileService
    ) {
        this.userClaimRepository = userClaimRepository;
        this.securityProfileService = securityProfileService;
    }

    public void DeleteUserClaim(UserClaim userClaim) {
        if (!this.securityProfileService.validateLoggedInUserIsSuperAdmin()) throw new AuthorizationServiceException("User not super admin");
        UserClaim toDelete = this.userClaimRepository.findByUser_UserIdAndClaim_ClaimId(userClaim.user.userId, userClaim.claim.claimId);
        this.userClaimRepository.delete(toDelete);
    }

    public UserClaim AddUserClaim(UserClaim userClaim) {
        if (!this.securityProfileService.validateLoggedInUserIsSuperAdmin()) throw new AuthorizationServiceException("User not super admin");
        this.userClaimRepository.save(userClaim);
        return userClaim;
    }
}