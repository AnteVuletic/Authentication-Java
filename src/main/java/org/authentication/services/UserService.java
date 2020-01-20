package org.authentication.services;

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
        user.password = bCryptPasswordEncoder.encode(user.password);
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

        return new org.springframework.security.core.userdetails.User(user.email, user.password, Collections.emptyList())
    }
}
