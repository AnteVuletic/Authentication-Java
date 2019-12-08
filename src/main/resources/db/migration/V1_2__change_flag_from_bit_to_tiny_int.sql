alter table authentication.users
drop column isactive;

alter table authentication.users
add isactive integer;