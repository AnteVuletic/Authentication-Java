package org.authentication.domain;

import org.hibernate.annotations.Type;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import java.util.Date;

@Entity
@Table(name = "Users")
public class User {
    @Id
    @Column(name = "userid")
    public String userId;

    @NotBlank
    @Column(unique = true, name= "email")
    @Size(min = 1, max = 30)
    public String email;

    @NotBlank
    @Column(name = "password")
    @Size(min = 5, max = 50)
    public String password;

    @NotBlank
    @Column(name = "firstname")
    public String firstName;

    @NotBlank
    @Column(name = "lastname")
    public String lastName;

    @NotBlank
    @Temporal(TemporalType.DATE)
    @Column(name = "dateofbirth")
    public Date dateOfBirth;

    @Column(name = "isactive")
    @Type(type = "org.hibernate.type.NumericBooleanType")
    public boolean isActive;

    @ManyToOne
    @JoinColumn(name = "securityprofileid")
    public SecurityProfile securityProfile;

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

    public Date getDateOfBirth() {
        return dateOfBirth;
    }

    public void setDateOfBirth(Date dateOfBirth) {
        this.dateOfBirth = dateOfBirth;
    }

    public boolean isActive() {
        return isActive;
    }

    public void setActive(boolean active) {
        isActive = active;
    }

    public SecurityProfile getSecurityProfile() {
        return securityProfile;
    }

    public void setSecurityProfile(SecurityProfile securityProfile) {
        this.securityProfile = securityProfile;
    }
}