package org.authentication.repository;

import org.authentication.domain.Claim;
import org.authentication.domain.User;
import org.authentication.domain.UserClaim;
import org.springframework.data.repository.CrudRepository;

import java.util.ArrayList;

public interface ClaimRepository extends CrudRepository<Claim, Integer> {
    Claim findByClaimId(int id);
    boolean existsClaimsByNameAndUser_UserId(String name, String userId);
    ArrayList<Claim> getAllByUser_UserId(String userId);
}
