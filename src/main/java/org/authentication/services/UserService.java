package org.authentication.services;

import org.authentication.domain.SecurityProfile;
import org.authentication.domain.User;
import org.authentication.repository.ClaimRepository;
import org.authentication.repository.SecurityProfileRepository;
import org.authentication.repository.UserRepository;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.Collections;
import java.util.UUID;

@Component
public class UserService implements UserDetailsService {
    private final UserRepository userRepository;
    private final SecurityProfileRepository securityProfileRepository;
    private final ClaimRepository claimRepository;

    public UserService(
            UserRepository userRepository,
            SecurityProfileRepository securityProfileRepository,
            ClaimRepository claimRepository
    ) {
        this.userRepository = userRepository;
        this.securityProfileRepository = securityProfileRepository;
        this.claimRepository = claimRepository;
    }

    public void addUser(User user) {
        if(this.userRepository.findByEmail(user.email) != null) return;
        BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder();
        SecurityProfile securityProfile = this.securityProfileRepository.findSecurityProfileByName("UserNotOwner");
        user.userId =  UUID.randomUUID().toString();
        user.password = bCryptPasswordEncoder.encode(user.password);
        user.securityProfile = securityProfile;
        this.userRepository.save(user);
    }

    public User findUserByEmail(String email) {
        return this.userRepository.findByEmail(email);
    }



    @Override
    public UserDetails loadUserByUsername(String s) throws UsernameNotFoundException {
        User user = findUserByEmail(s);

        if (user == null) {
            throw new UsernameNotFoundException(s);
        }

        return new org.springframework.security.core.userdetails.User(user.email, user.password, Collections.emptyList());
    }
}
