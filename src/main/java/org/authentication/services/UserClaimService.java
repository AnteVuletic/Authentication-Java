package org.authentication.services;

import org.authentication.domain.Claim;
import org.authentication.domain.User;
import org.authentication.repository.ClaimRepository;
import org.authentication.repository.UserRepository;
import org.springframework.security.access.AuthorizationServiceException;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

@Component
public class UserClaimService {
    private final UserRepository userRepository;
    private final SecurityProfileService securityProfileService;
    private final ClaimRepository claimRepository;

    public UserClaimService(
            UserRepository userRepository,
            SecurityProfileService securityProfileService,
            ClaimRepository claimRepository
    ) {
        this.userRepository = userRepository;
        this.securityProfileService = securityProfileService;
        this.claimRepository = claimRepository;
    }

}
