DROP TABLE IF EXISTS user_certifications CASCADE;

CREATE TABLE user_certifications (
    user_id INTEGER NOT NULL,
    cert_id INTEGER NOT NULL,
    -- cert_in_training boolean,
    -- cert_is_instructor boolean,
    -- cert_is_evaluator boolean,
    FOREIGN KEY (user_id) REFERENCES users (user_id),
    FOREIGN KEY (cert_id) REFERENCES certifications (cert_id)
);

