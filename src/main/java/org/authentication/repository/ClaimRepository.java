package org.authentication.repository;

import org.authentication.domain.Claim;
import org.springframework.data.repository.CrudRepository;

public interface ClaimRepository extends CrudRepository<Claim, Integer> {
}
