CREATE TABLE user_qualifications (
    user_id INTEGER NOT NULL,
    qual_id INTEGER NOT NULL,
    in_training boolean,
    is_instructor boolean,
    is_evaluator boolean,
    FOREIGN KEY (user_id) REFERENCES users (user_id),
    FOREIGN KEY (qual_id) REFERENCES qualification (qual_id)
);

INSERT INTO user_qualifications (user_id,qual_id,in_training,is_instructor,is_evaluator) VALUES
    (1,1,true,false,false),
    (2,1,false,true,false),
    (2,3,false,true,false),
    (2,6,false,true,true)
;
