package org.authentication.repository;

import org.authentication.domain.Claim;
import org.authentication.domain.User;
import org.springframework.data.repository.CrudRepository;

import java.util.ArrayList;

public interface ClaimRepository extends CrudRepository<Claim, Integer> {
    ArrayList<Claim> getAllByUser(User user);
    Claim findByClaimId(int id);
    boolean existsClaimsByResourceIdAndUser_UserId(String resource, String userId);
    ArrayList<Claim> getAllByUser_UserId(String userId);
}
