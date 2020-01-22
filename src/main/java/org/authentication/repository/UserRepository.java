package org.authentication.repository;

import org.authentication.domain.User;
import org.springframework.data.repository.CrudRepository;

import java.util.ArrayList;

public interface UserRepository extends CrudRepository<User, String> {
    User findByEmail(String email);
    ArrayList<User> getAllBySecurityProfile_SecurityProfileId(int securityProfileId);
    int countAllBySecurityProfile_NameAndEmail(String profileName, String email);
}
