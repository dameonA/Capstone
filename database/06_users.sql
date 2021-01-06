DROP TABLE IF EXISTS users CASCADE;

CREATE TABLE users (
    user_id serial primary key,
    first_name varchar(20) NOT NULL,
    last_name varchar(20) NOT NULL,
    grade varchar(20) NOT NULL,
    -- qualification INTEGER REFERENCES user_qualifications(id) ON DELETE CASCADE,
    -- certification INTEGER REFERENCES user_certifications(id) ON DELETE CASCADE,
    user_role INTEGER REFERENCES roles(role_id) ON DELETE CASCADE,
    section INTEGER REFERENCES sections(section_id) ON DELETE CASCADE,
    user_group INTEGER REFERENCES usergroups(group_id) ON DELETE CASCADE,
    active boolean
);

INSERT INTO users (first_name, last_name, grade, user_role, section, user_group, active) VALUES
    ('joe', 'snuffy', 'A1C', 1, 2, 1, false),
    ('joe1', 'snuffy', 'A1C', 1, 2, 1, false),
    ('joe2', 'snuffy', 'A1C', 2, 2, 1, false),
    ('joe3', 'snuffy', 'A1C', 3, 2, 1, false),
    ('joe4', 'snuffy', 'A1C', 4, 2, 1, false),
    ('joe5', 'snuffy', 'A1C', 1, 2, 1, false),
    ('joe6', 'snuffy', 'A1C', 1, 2, 1, false),
    ('joe7', 'snuffy', 'A1C', 1, 2, 1, false),
    ('joe8', 'snuffy', 'A1C', 1, 2, 1, false),
    ('joe9', 'snuffy', 'A1C', 1, 2, 1, false),
    ('joea', 'snuffy', 'A1C', 1, 2, 1, false),
    ('joeb', 'snuffy', 'A1C', 1, 2, 1, false),
    ('joec', 'snuffy', 'A1C', 1, 2, 1, false),
    ('joed', 'snuffy', 'A1C', 1, 2, 1, false),
    ('joee', 'snuffy', 'A1C', 1, 2, 1, false),
    ('joef', 'snuffy', 'A1C', 1, 2, 1, false),
    ('joeg', 'snuffy', 'A1C', 1, 2, 1, false),
    ('joeh', 'snuffy', 'A1C', 1, 2, 1, false),
    ('joei', 'snuffy', 'A1C', 1, 2, 1, false),
    ('joej', 'snuffy', 'A1C', 1, 2, 1, false),
    ('joek', 'snuffy', 'A1C', 1, 2, 1, false),
    ('joel', 'snuffy', 'A1C', 1, 2, 1, false),
    ('joem', 'snuffy', 'A1C', 1, 2, 1, false),
    ('another', 'snuffy', 'Lt Col', 2, 2, 1, true)
;
