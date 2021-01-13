DROP TABLE IF EXISTS schedule CASCADE;
CREATE TABLE schedule (
    schedule_id serial primary key,
    start_time TIMESTAMP NOT NULL,
    stop_time TIMESTAMP NOT NULL,
    position_id INTEGER,
    user_id INTEGER,
    CONSTRAINT schedule_user_FK
        FOREIGN KEY (user_id) 
        REFERENCES users (user_id),
    CONSTRAINT schedule_positions_FK
        FOREIGN KEY (position_id)
        REFERENCES positions (position_id)
);
