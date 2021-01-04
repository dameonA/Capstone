CREATE TABLE logs (
    id int NOT NULL AUTO_INCREMENT,
    sensor_id int NULL,
    details text,
    entry_dtg datetime NULL,
    archived boolean,
    PRIMARY KEY (id)
);

CREATE TABLE log_history (
    id int NOT NULL AUTO_INCREMENT,
    log_id int NOT NULL,
    details text,
    original_dtg datetime NULL,
    updated_dtg datetime NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (log_id) REFERENCES logs(id)
);

CREATE TABLE log_comments (
    id int NOT NULL AUTO_INCREMENT,
    log_id int NOT NULL,
    details text,
    comment_dtg datetime NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (log_id) REFERENCES logs(id)
);

INSERT INTO logs (sensor_id, details, entry_dtg, archived) VALUES
    (1, "This is my first log entry.", "2020-12-15 14:50:12", 0),
    (1, "This is my first log entry that has comments.", "2020-12-15 14:55:12", 0),
    (1, "This is my first log entry that was edited.", "2020-12-15 15:00:55", 0),
    (1, "This is my first archived message.", "2020-12-15 15:05:40", 1)
;

INSERT INTO log_history (log_id, details, original_dtg, updated_dtg) VALUES
    (3, "This is my first log entry.", "2020-12-15 15:00:55", "2020-12-15 15:01:25"),
    (3, "This is my first log that aws edited.", "2020-12-15 15:01:25", "2020-12-15 15:02:35")
;

INSERT INTO log_comments (log_id, details, comment_dtg) VALUES
    (2, "This is my first comment.", "2020-12-15 15:30:15"),
    (2, "This is another comment.", "2020-12-15 15:35:41")
;