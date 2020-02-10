package org.authentication.repository;


import org.authentication.domain.UserClaim;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface UserClaimRepository extends CrudRepository<UserClaim, Integer> {
    List<UserClaim> findAllByUser_UserId(String userId);
    List<UserClaim> findAllByClaim_ClaimId(int claimId);
}
