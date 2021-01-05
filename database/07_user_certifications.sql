CREATE TABLE user_certifications (
    user_id INTEGER NOT NULL,
    cert_id INTEGER NOT NULL,
    -- cert_in_training boolean,
    -- cert_is_instructor boolean,
    -- cert_is_evaluator boolean,
    FOREIGN KEY (user_id) REFERENCES users (user_id),
    FOREIGN KEY (cert_id) REFERENCES certification (cert_id)
);

INSERT INTO user_certifications (user_id,cert_id) VALUES
    (1,1),
    (2,1),
    (2,3),
    (2,6)
;
