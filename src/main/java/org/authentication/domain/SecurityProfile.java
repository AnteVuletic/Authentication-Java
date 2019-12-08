package org.authentication.domain;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import java.util.List;

@Entity
@Table(name = "securityprofiles")
public class SecurityProfile {
    @Id
    @Column(name = "securityprofileid")
    private int SecurityProfileId;

    @NotBlank
    @Column(unique = true, name = "name")
    @Size(min = 1, max = 30)
    private String Name;

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
