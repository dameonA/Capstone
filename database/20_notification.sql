CREATE TABLE notification (
    id serial primary key,
    userId INTEGER REFERENCES users(id) ON DELETE CASCADE,
    role_id INTEGER REFERENCES roles(id) ON DELETE CASCADE,
    type_notify INTEGER REFERENCES notificationtype(id) ON DELETE CASCADE,
    sent_tm TIMESTAMP NOT NULL,
    comment varchar(250),
    is_read boolean,
    archived boolean
);

