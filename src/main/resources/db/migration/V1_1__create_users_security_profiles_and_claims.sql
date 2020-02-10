create table authentication.SecurityProfiles (
	SecurityProfileId serial,
	Name varchar(30) not null,
    Description     varchar(150),
	primary key (SecurityProfileId)
);

insert into authentication.SecurityProfiles (Name)
values  ('SuperAdmin'),
        ('Admin'),
        ('User'),
        ('UserNotOwner'),
        ('ClientBank');

create table authentication.Users (
	UserId 		        varchar(50),
	Email 		        varchar(30) not null,
    Password            varchar(9000) not null,
	FirstName			varchar(50) not null,
	LastName			varchar(50) not null,
	SecurityProfileId   integer references  authentication.SecurityProfiles(SecurityProfileId),
	primary key (UserId)
);


create table authentication.Claims(
    ClaimId 		serial,
    Name			varchar(50),
    Description     varchar(150),
    primary key (ClaimId)
);

create table authentication.UserClaims(
    UserClaimId     serial,
    UserId          varchar(50) references authentication.Users(UserId),
    ClaimId         integer references authentication.Claims(ClaimId),
    primary key (UserClaimId)
)
