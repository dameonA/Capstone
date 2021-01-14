DROP TABLE IF EXISTS user_auth CASCADE;

CREATE TABLE user_auth (
    username varchar(250) NOT NULL PRIMARY KEY UNIQUE,
    user_id integer REFERENCES users(user_id) ON DELETE CASCADE,
    password varchar(250) NOT NULL,
    disabled boolean DEFAULT false
);

INSERT INTO user_auth (username, user_id,password) VALUES
    ('user', 25, 'password'),
    ('user2', 26, 'password'),
    ('user3', 27, 'password'),
    ('user4', 28, 'password')
;
