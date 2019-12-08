package org.authentication.domain;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import java.util.List;

@Entity
@Table(name = "SecurityProfiles")
public class SecurityProfile {
    @Id
    private int SecurityProfileId;

    @NotBlank
    @Column(unique = true)
    @Size(min = 1, max = 30)
    private String Name;

    @OneToMany
    @JoinColumn(name = "Users")
    private List<User> Users;

    public int getSecurityProfileId() {
        return SecurityProfileId;
    }

    public void setSecurityProfileId(int securityProfileId) {
        SecurityProfileId = securityProfileId;
    }

    public String getName() {
        return Name;
    }

    public void setName(String name) {
        Name = name;
    }
}
