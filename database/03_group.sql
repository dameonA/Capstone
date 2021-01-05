
CREATE TABLE usergroup (
    group_id serial primary key,
    group_name varchar(50)
);

INSERT INTO usergroup (group_name) VALUES
    ('Blue'),
    ('Green'),
    ('Day Staff'),
    ('DSG')
 ;
