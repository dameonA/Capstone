CREATE TABLE users (
    id serial primary key,
    first_name varchar(20) NOT NULL,
    last_name varchar(20) NOT NULL,
    grade varchar(20) NOT NULL,
    -- qualification INTEGER REFERENCES user_qualifications(id) ON DELETE CASCADE,
    -- certification INTEGER REFERENCES user_certifications(id) ON DELETE CASCADE,
    user_role INTEGER REFERENCES roles(id) ON DELETE CASCADE,
    section INTEGER REFERENCES section(id) ON DELETE CASCADE,
    user_group INTEGER REFERENCES usergroup(id) ON DELETE CASCADE,
    active boolean
);

INSERT INTO users (first_name, last_name, grade, user_role, section, user_group, active) VALUES
    ('joe', 'snuffy', 'A1C', 1, 2, 1, false),
    ('another', 'snuffy', 'Lt Col', 2, 2, 1, true)
;
