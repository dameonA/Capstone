
CREATE TABLE roles (
    id serial primary key,
    roles_name varchar(50)
);

INSERT INTO roles (roles_name) VALUES
    ('Admin'),
    ('Scheduler'),
    ('Supervisor'),
    ('Crew')
;

