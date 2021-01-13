DROP TABLE IF EXISTS qualifications CASCADE;

CREATE TABLE qualifications (
    qual_id serial primary key,
    qual_name varchar(10)
);

INSERT INTO qualifications (qual_name) VALUES
    ('MCC'),
    ('MCCT'),
    ('RSC'),
    ('SD'),    
    ('SDT'),
    ('AWO'),
    ('WD'),
    ('ASO'),
    ('AST'),    
    ('IDT'),
    ('TT'),
    ('ICO'),
    ('ICOT'),
    ('ICT')
 ;
