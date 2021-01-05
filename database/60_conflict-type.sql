CREATE TABLE conflict_type (
    conflict_type_id serial primary key,
    conflict_type_name varchar(250)
);

INSERT INTO conflict_type (conflict_type_name) VALUES
    ('Leave Approved'),
    ('Leave Requested'),
    ('TDY'),
    ('DNIC'),    
    ('Appointment'),
    ('Other (text)')
 ;