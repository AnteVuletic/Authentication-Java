package org.authentication.domain;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

@Entity
@Table(name = "Claims")
public class Claim {
    @Id
    private int ClaimId;

    @ManyToOne
    @JoinColumn(name = "UserId", table = "Users")
    private User User;

    @NotBlank
    @Size(min = 1, max = 50)
    private String ResourceId;

    public int getClaimId() {
        return ClaimId;
    }

    public void setClaimId(int claimId) {
        ClaimId = claimId;
    }

    public User getSecurityProfile() {
        return User;
    }

    public void setSecurityProfile(User User) {
        User = User;
    }

    public String getResourceId() {
        return ResourceId;
    }

    public void setResourceId(String resourceId) {
        ResourceId = resourceId;
    }
}
