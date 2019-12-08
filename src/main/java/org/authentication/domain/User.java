package org.authentication.domain;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import java.util.Date;
import java.util.List;

@Entity
@Table(name = "Users")
public class User {
    @Id
    private String UserId;

    @NotBlank
    @Column(unique = true)
    @Size(min = 1, max = 30)
    private String Email;

    @NotBlank
    @Size(min = 5, max = 50)
    private String Password;

    @NotBlank
    private String FirstName;

    @NotBlank
    private String LastName;

    @NotBlank
    private Date DateOfBirth;

    private boolean IsActive;

    @ManyToOne
    @JoinColumn(name = "SecurityProfileId", table = "SecurityProfiles")
    private SecurityProfile SecurityProfile;

    public org.authentication.domain.SecurityProfile getSecurityProfile() {
        return SecurityProfile;
    }

    public void setSecurityProfile(org.authentication.domain.SecurityProfile securityProfile) {
        SecurityProfile = securityProfile;
    }

    public String getUserId() {
        return UserId;
    }

    public void setUserId(String userId) {
        UserId = userId;
    }

    public String getEmail() {
        return Email;
    }

    public void setEmail(String email) {
        Email = email;
    }

    public String getPassword() {
        return Password;
    }

    public void setPassword(String password) {
        Password = password;
    }

    public String getFirstName() {
        return FirstName;
    }

    public void setFirstName(String firstName) {
        FirstName = firstName;
    }

    public String getLastName() {
        return LastName;
    }

    public void setLastName(String lastName) {
        LastName = lastName;
    }

    public Date getDateOfBirth() {
        return DateOfBirth;
    }

    public void setDateOfBirth(Date dateOfBirth) {
        DateOfBirth = dateOfBirth;
    }

    public boolean isActive() {
        return IsActive;
    }

    public void setActive(boolean active) {
        IsActive = active;
    }
}