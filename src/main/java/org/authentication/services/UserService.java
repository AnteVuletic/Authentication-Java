package org.authentication.services;

import org.authentication.domain.Claim;
import org.authentication.domain.SecurityProfile;
import org.authentication.domain.User;
import org.authentication.domain.UserClaim;
import org.authentication.repository.ClaimRepository;
import org.authentication.repository.SecurityProfileRepository;
import org.authentication.repository.UserClaimRepository;
import org.authentication.repository.UserRepository;
import org.springframework.security.access.AuthorizationServiceException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;

import java.lang.reflect.Array;
import java.util.*;

@Component
public class UserService implements UserDetailsService {
    private final UserRepository userRepository;
    private final SecurityProfileRepository securityProfileRepository;
    private final SecurityProfileService securityProfileService;
    private final ClaimRepository claimRepository;
    private final UserClaimRepository userClaimRepository;
    BCryptPasswordEncoder bCryptPasswordEncoder;

    public UserService(
            UserRepository userRepository,
            SecurityProfileRepository securityProfileRepository,
            ClaimRepository claimRepository,
            SecurityProfileService securityProfileService,
            UserClaimRepository userClaimRepository
    ) {
        this.userRepository = userRepository;
        this.securityProfileRepository = securityProfileRepository;
        this.claimRepository = claimRepository;
        this.securityProfileService = securityProfileService;
        this.userClaimRepository = userClaimRepository;
        this.bCryptPasswordEncoder = new BCryptPasswordEncoder();
    }

    public List<User>getAllUsers(){
        List<User> users = this.userRepository.findAll();
        users.forEach( user -> {
            user.securityProfile.users = null;
        });
        return users;
    }

    public void addUser(User user) {
        SecurityProfile securityProfile = this.securityProfileRepository.findSecurityProfileByName("UserNotOwner");
        user.userId =  UUID.randomUUID().toString();
        user.password = this.bCryptPasswordEncoder.encode(user.password);
        user.securityProfile = securityProfile;
        this.userRepository.save(user);
    }

    public User updateUserDetails(String userId, String email, String firstName, String lastName) {
        if(this.userRepository.findById(userId) == null) return null;
        Optional<User> userOptional = this.userRepository.findById(userId);
        if (!userOptional.isPresent()) return null;
        User user = userOptional.get();
        user.email = email;
        user.firstName = firstName;
        user.lastName = lastName;
        this.userRepository.save(user);
        return user;
    }

    public void resetUserPassword(String userId, String oldPassword, String newPassword) {
        Optional<User> userOptional = this.userRepository.findById(userId);
        if (!userOptional.isPresent()) return;
        User user = userOptional.get();
        boolean isMatch = this.bCryptPasswordEncoder.matches(oldPassword, user.password);
        if (!isMatch) return;
        user.password = this.bCryptPasswordEncoder.encode(newPassword);
        this.userRepository.save(user);
    }

    public void updateUserClaims(User user, List<Claim> claims) {
        if (!this.securityProfileService.validateLoggedInUserIsSuperAdmin()) throw new AuthorizationServiceException("User not super admin");
        List<UserClaim> currentClaims = this.userClaimRepository.findAllByUser_UserId(user.userId);
        Optional<User> userToEdit = this.userRepository.findById(user.userId);
        User gottenUser = userToEdit.get();

        currentClaims.forEach(userClaim -> {
            this.userClaimRepository.delete(userClaim);
        });

        claims.forEach(claim -> {
            this.userClaimRepository.save(new UserClaim(claim, gottenUser));
        });
    }

    public List<User> getAllUsersByClaimId(int claimId) {
        List<UserClaim> userClaims = this.userClaimRepository.findAllByClaim_ClaimId(claimId);
        ArrayList<User> users = new ArrayList<>();

        userClaims.forEach(userClaim -> {
            users.add(userClaim.user);
        });

        users.forEach(user -> {user.securityProfile.users = null; user.userClaims = null;});

        return users;
    }

    public User findUserByEmail(String email) {
        User user = this.userRepository.getByEmail(email);
        user.securityProfile.users = null;
        user.setUserClaims(userClaimRepository.findAllByUser_UserId(user.userId));
        user.userClaims.forEach(userClaim -> {userClaim.user = null; userClaim.claim.claims = null;});
        return user;
    }

    public List<User> findUserByContainingEmailFirstNameLastName(String email, String firstName, String lastName) {
        List<User> users = this.userRepository.findAllByEmailContainsAndFirstNameContainsAndLastNameContains(email, firstName, lastName);
        users.forEach(user -> {user.securityProfile.users = new ArrayList<User>(); user.userClaims = new ArrayList<UserClaim>();});
        return users;
    }

    @Override
    public UserDetails loadUserByUsername(String s) throws UsernameNotFoundException {
        User user = findUserByEmail(s);

        if (user == null) {
            throw new UsernameNotFoundException(s);
        }

        user.securityProfile.users = null;

        return new org.springframework.security.core.userdetails.User(user.email, user.password, Collections.emptyList());
    }
}
