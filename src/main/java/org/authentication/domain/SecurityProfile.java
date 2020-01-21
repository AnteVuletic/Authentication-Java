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
    public int securityProfileId;

    @NotBlank
    @Column(unique = true, name = "name")
    @Size(min = 1, max = 30)
    public String name;

    public SecurityProfile() {}

    public int getSecurityProfileId() {
        return securityProfileId;
    }

    public void setSecurityProfileId(int securityProfileId) {
        this.securityProfileId = securityProfileId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
