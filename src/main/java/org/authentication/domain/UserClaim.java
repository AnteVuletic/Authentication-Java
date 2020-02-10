package org.authentication.domain;

import javax.persistence.*;

@Entity
@Table(name = "userclaims")
public class UserClaim {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "userclaimid")
    public int userClaimId;

    @ManyToOne
    @JoinColumn(name = "userid")
    public User user;

    @ManyToOne
    @JoinColumn(name = "claimid")
    public Claim claim;

    public UserClaim() {}

    public UserClaim(Claim claim, User user) {
        this.claim = claim;
        this.user = user;
    }

    public int getUserClaimId() {
        return userClaimId;
    }

    public void setUserClaimId(int userClaimId) {
        this.userClaimId = userClaimId;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Claim getClaim() {
        return claim;
    }

    public void setClaim(Claim claim) {
        this.claim = claim;
    }
}
