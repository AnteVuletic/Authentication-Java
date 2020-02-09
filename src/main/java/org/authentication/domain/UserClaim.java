package org.authentication.domain;

import javax.persistence.*;

@Entity
@Table(name = "userclaims")
public class UserClaim {
    @Id
    @Column(name = "userclaimid")
    public String userclaimid;

    @ManyToOne
    @JoinColumn(name = "userid")
    public User user;

    @ManyToOne
    @JoinColumn(name = "claimid")
    public Claim claim;
}
