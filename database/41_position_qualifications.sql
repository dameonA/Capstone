CREATE TABLE position_qualifications (
    position_id INTEGER NOT NULL,
    qual_id INTEGER NOT NULL,
    FOREIGN KEY (position_id) REFERENCES positions (position_id),
    FOREIGN KEY (qual_id) REFERENCES qualifications (qual_id)
);

INSERT INTO positions (position_id,qual_id) VALUES
(1,1),
(2,1),
(3,2),
(4,2),
(6,4),
(7,4),
(8,7),
(9,9),
(10,11),
(11,10)
;
