DROP TABLE IF EXISTS roles CASCADE;

CREATE TABLE roles (
    role_id serial primary key,
    role_name varchar(50)
);

INSERT INTO roles (role_name) VALUES
    ('Admin'),
    ('Scheduler'),
    ('Supervisor'),
    ('Crew')
;

