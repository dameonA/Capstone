DROP TABLE IF EXISTS conflict CASCADE;
CREATE TABLE conflict (
    conflict_id serial primary key,
    conflict_type_id INTEGER NOT NULL,
    FOREIGN KEY (conflict_type_id) REFERENCES conflict_type (conflict_type_id),
    start_time TIMESTAMP NOT NULL,
    stop_time TIMESTAMP NOT NULL,
    comment VARCHAR(250),
    schedule_id INTEGER NOT NULL,
    FOREIGN KEY (schedule_id) REFERENCES schedule (schedule_id)
);