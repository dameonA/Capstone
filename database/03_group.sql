
CREATE TABLE usergroups (
    group_id serial primary key,
    group_name varchar(50)
);

INSERT INTO usergroups (group_name) VALUES
    ('Blue'),
    ('Green'),
    ('Day Staff'),
    ('DSG')
 ;
