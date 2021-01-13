DROP TABLE IF EXISTS notification CASCADE;
CREATE TABLE notification (
    id serial primary key,
    userId INTEGER REFERENCES users(user_id) ON DELETE CASCADE,
    role_id INTEGER REFERENCES roles(role_id) ON DELETE CASCADE,
    type_notify INTEGER REFERENCES notificationtype(id) ON DELETE CASCADE,
    sent_tm TIMESTAMP NOT NULL DEFAULT Now(),
    comment varchar(250),
    is_read boolean,
    archived boolean
);

