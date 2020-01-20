package org.authentication.repository;

import org.authentication.domain.SecurityProfile;
import org.springframework.data.repository.CrudRepository;

public interface SecurityProfileRepository extends CrudRepository<SecurityProfile, Integer> {
    SecurityProfile findSecurityProfileByName(String name);
}
