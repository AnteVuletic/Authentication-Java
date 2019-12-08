create table authentication.SecurityProfiles (
	SecurityProfileId serial,
	Name varchar(30) not null,
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
	Password	        varchar(50) not null,
	FirstName					varchar(50) not null,
	LastName					varchar(50) not null,
	DateOfBirth				date,
	IsActive	        bit,
	SecurityProfileId   integer references  authentication.SecurityProfiles(SecurityProfileId),
	primary key (UserId)
);

create table authentication.Claims(
	ClaimId 		serial,
	UserId			varchar(50) references authentication.Users(UserId),
	ResourceId	varchar(50) not null,
	primary key (ClaimId)
)