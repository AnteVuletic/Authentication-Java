package org.authentication.domain;

import javax.persistence.*;
import javax.validation.constraints.Size;
import java.util.List;

@Entity
@Table(name = "claims")
public class Claim {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "claimid")
    public int claimId;

    @Size(min = 1, max = 50)
    @Column(name = "name")
    public String name;

    @Size(min = 1, max = 150)
    @Column(name = "description")
    public String description;

    @OneToMany(mappedBy="claim")
    public List<UserClaim> claims;

    public Claim() {}

    public int getClaimId() {
        return claimId;
    }

    public void setClaimId(int claimId) {
        this.claimId = claimId;
    }
}
