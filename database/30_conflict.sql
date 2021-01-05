CREATE TABLE conflict (
    conflict_id serial primary key,
    FOREIGN KEY (conflict_type_id) REFERENCES conflict_type (conflict_type_id),
    start_time TIMESTAMP NOT NULL,
    stop_time TIMESTAMP NOT NULL,
    comment CHAR(250),
    FOREIGN KEY (schedule_id) REFERENCES schedule (schedule_id)
);