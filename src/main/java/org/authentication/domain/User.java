package org.authentication.domain;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import java.util.List;

@Entity
@Table(name = "users")
public class User {
    @Id
    @Column(name = "userid")
    public String userId;

    @NotBlank
    @Column(unique = true, name= "email")
    public String email;

    @NotBlank
    @Column(name = "password")
    public String password;

    @NotBlank
    @Column(name = "firstname")
    public String firstName;

    @NotBlank
    @Column(name = "lastname")
    public String lastName;

    @ManyToOne
    @JoinColumn(name = "securityprofileid")
    public SecurityProfile securityProfile;

    @OneToMany(mappedBy="user")
    public List<UserClaim> userClaims;

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public SecurityProfile getSecurityProfile() {
        return securityProfile;
    }

    public void setSecurityProfile(SecurityProfile securityProfile) {
        this.securityProfile = securityProfile;
    }

    public List<UserClaim> getUserClaims() {
        return userClaims;
    }

    public void setUserClaims(List<UserClaim> userClaims) {
        this.userClaims = userClaims;
    }
}