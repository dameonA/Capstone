DROP TABLE IF EXISTS notificationtype CASCADE;

CREATE TABLE notificationtype (
    id serial primary key,
    notify_name varchar(250)
);

INSERT INTO notificationtype (notify_name) VALUES
    ('Crew Schedule Change'),
    ('Conflict Alert'),
    ('Min Manning Not Met')
 ;