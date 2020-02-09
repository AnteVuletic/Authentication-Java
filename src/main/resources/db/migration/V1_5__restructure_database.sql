create table authentication.UserClaims (
	UserClaimId 		        varchar(50),
	UserId			            varchar(50) references authentication.Users(UserId),
	ClaimId			            int references authentication.Claims(ClaimId),
	primary key (UserClaimId)
);

alter table authentication.Claims
drop column resourceid;

alter table authentication.Claims
drop column userid;

alter table authentication.Claims
add name varchar(50);

alter table authentication.Claims
add description varchar(150);

alter table authentication.Users
drop column isactive;

alter table authentication.SecurityProfiles
add description varchar(150);
