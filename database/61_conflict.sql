DROP TABLE IF EXISTS conflict CASCADE;
CREATE TABLE conflict (
    conflict_id serial primary key,
    conflict_type_id INTEGER NOT NULL,
    FOREIGN KEY (conflict_type_id) REFERENCES conflict_type (conflict_type_id),
    start_time TIMESTAMP NOT NULL,
    stop_time TIMESTAMP NOT NULL,
    comment VARCHAR(250),
    user_id INTEGER NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users (user_id)
);