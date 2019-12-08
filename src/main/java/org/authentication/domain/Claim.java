package org.authentication.domain;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

@Entity
@Table(name = "Claims")
public class Claim {
    @Id
    @Column(name = "claimid")
    private int ClaimId;

    @NotBlank
    @Size(min = 1, max = 50)
    @Column(name = "resourceid")
    private String ResourceId;

    @ManyToOne
    @JoinColumn(name = "userid")
    private User User;

    public int getClaimId() {
        return ClaimId;
    }

    public void setClaimId(int claimId) {
        ClaimId = claimId;
    }

    public String getResourceId() {
        return ResourceId;
    }

    public void setResourceId(String resourceId) {
        ResourceId = resourceId;
    }
}
