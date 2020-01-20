package org.authentication.repository;

import org.authentication.domain.Claim;
import org.authentication.domain.User;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface ClaimRepository extends CrudRepository<Claim, Integer> {
    List<Claim> getAllByUser(User user);
}
