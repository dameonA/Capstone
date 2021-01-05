CREATE TABLE position_certifications (
    position_id INTEGER NOT NULL,
    cert_id INTEGER NOT NULL,
    FOREIGN KEY (position_id) REFERENCES positions (position_id),
    FOREIGN KEY (cert_id) REFERENCES certifications (cert_id)
);

INSERT INTO position_certifications (position_id,cert_id) VALUES
(5,1)
;
