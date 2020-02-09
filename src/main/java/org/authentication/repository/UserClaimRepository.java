package org.authentication.repository;

import org.authentication.domain.User;
import org.authentication.domain.UserClaim;
import org.springframework.data.repository.CrudRepository;

import java.util.ArrayList;

public interface UserClaimRepository extends CrudRepository<User, String> {
    UserClaim findUserClaimByUserId(String userId);
    UserClaim findUserClaimByClaimId(int claimId);
}
