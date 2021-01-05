CREATE TABLE certification (
    cert_id serial primary key,
    cert_name varchar(10)
);

INSERT INTO certification (cert_name) VALUES
    ('RSC'),
    ('FO'),
    ('EA'),
    ('ERSA'),
    ('TANR'),
    ('SS')
 ;