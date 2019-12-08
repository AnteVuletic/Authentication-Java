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
    private String UserId;

    @NotBlank
    @Column(unique = true, name= "email")
    @Size(min = 1, max = 30)
    private String Email;

    @NotBlank
    @Column(name = "password")
    @Size(min = 5, max = 50)
    private String Password;

    @NotBlank
    @Column(name = "firstname")
    private String FirstName;

    @NotBlank
    @Column(name = "lastname")
    private String LastName;

    @NotBlank
    @Temporal(TemporalType.DATE)
    @Column(name = "dateofbirth")
    private Date DateOfBirth;

    @Column(name = "isactive")
    @Type(type = "org.hibernate.type.NumericBooleanType")
    private boolean IsActive;

    @ManyToOne
    @JoinColumn(name = "securityprofileid")
    private SecurityProfile SecurityProfile;

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