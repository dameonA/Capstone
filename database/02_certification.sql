DROP TABLE IF EXISTS certifications CASCADE;

CREATE TABLE certifications (
    cert_id serial primary key,
    cert_name varchar(10)
);

INSERT INTO certifications (cert_name) VALUES
    ('RSC'),
    ('FO'),
    ('EA'),
    ('ERSA'),
    ('TANR'),
    ('SS')
 ;