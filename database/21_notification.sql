DROP TABLE IF EXISTS notification CASCADE;
CREATE TABLE notification (
    id serial primary key,
    userId INTEGER REFERENCES users(user_id) ON DELETE CASCADE,
    role_id INTEGER REFERENCES roles(role_id) ON DELETE CASCADE,
    type_notify INTEGER REFERENCES notificationtype(id) ON DELETE CASCADE,
    sent_tm TIMESTAMP NOT NULL,
    comment varchar(250),
    is_read boolean,
    archived boolean
);

INSERT INTO notification (userId, role_id, type_notify, sent_tm, comment, is_read, archived) VALUES
(1, NULL, 2, '2021-01-03 04:05:06', 'You are working tomorrow', true, false),
(NULL, 2, 3, '2021-01-03 04:05:06', 'Joe is on quarters', false, false)
;