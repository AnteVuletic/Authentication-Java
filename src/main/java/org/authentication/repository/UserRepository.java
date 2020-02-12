package org.authentication.repository;

import org.authentication.domain.User;
import org.springframework.data.repository.CrudRepository;

import java.util.ArrayList;
import java.util.List;

public interface UserRepository extends CrudRepository<User, String> {
    User getByUserId(String userId);
    List<User> findAll();
    User getByEmail(String email);
    List<User> findAllByEmailContainsAndFirstNameContainsAndLastNameContains(String email, String firstName, String lastName);
    ArrayList<User> getAllBySecurityProfile_SecurityProfileId(int securityProfileId);
    int countAllBySecurityProfile_NameAndEmail(String profileName, String email);
}
