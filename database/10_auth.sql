CREATE TABLE user_auth (
    username varchar(250) NOT NULL PRIMARY KEY UNIQUE,
    user_id integer REFERENCES users(user_id) ON DELETE CASCADE,
    password varchar(250) NOT NULL,
    disabled boolean DEFAULT false
);

INSERT INTO user_auth (username, user_id,password) VALUES
    ('joe1', 2, 'password'),
    ('joe2', 3, 'password'),
    ('joe3', 4, 'password'),
    ('joe4', 5, 'password')
;
