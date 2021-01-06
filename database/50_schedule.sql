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

INSERT INTO schedule (start_time, stop_time, position_id, user_id) VALUES
    ('2021-01-01 06:30:00 PST', '2021-01-01 18:30:00 PST', 1, 1),
    ('2021-01-01 06:30:00 PST', '2021-01-01 18:30:00 PST', 2, 2),
    ('2021-01-01 06:30:00 PST', '2021-01-01 18:30:00 PST', 3, 3),
    ('2021-01-01 06:30:00 PST', '2021-01-01 18:30:00 PST', 4, 4),
    ('2021-01-01 06:30:00 PST', '2021-01-01 18:30:00 PST', 5, 5),
    ('2021-01-01 06:30:00 PST', '2021-01-01 18:30:00 PST', 6, 6),
    ('2021-01-01 06:30:00 PST', '2021-01-01 18:30:00 PST', 7, 7),
    ('2021-01-01 06:30:00 PST', '2021-01-01 18:30:00 PST', 8, 8),
    ('2021-01-01 06:30:00 PST', '2021-01-01 18:30:00 PST', 8, 15),
    ('2021-01-01 06:30:00 PST', '2021-01-01 18:30:00 PST', 9, 9),
    ('2021-01-01 06:30:00 PST', '2021-01-01 18:30:00 PST', 9, 16),
    ('2021-01-01 06:30:00 PST', '2021-01-01 18:30:00 PST', 10, 10),
    ('2021-01-01 06:30:00 PST', '2021-01-01 18:30:00 PST', 10, 17),
    ('2021-01-01 06:30:00 PST', '2021-01-01 18:30:00 PST', 10, 18),
    ('2021-01-01 06:30:00 PST', '2021-01-01 18:30:00 PST', 11, 19),
    ('2021-01-01 06:30:00 PST', '2021-01-01 18:30:00 PST', 12, 12),
    ('2021-01-01 06:30:00 PST', '2021-01-01 18:30:00 PST', 12, 20),    
    ('2021-01-01 06:30:00 PST', '2021-01-01 18:30:00 PST', 13, 13),
    ('2021-01-01 06:30:00 PST', '2021-01-01 18:30:00 PST', 14, 14)