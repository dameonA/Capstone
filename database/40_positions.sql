CREATE TABLE positions (
    position_id SERIAL PRIMARY KEY,
    position_name varchar(50) NOT NULL,
    minimum INTEGER NOT NULL
);

INSERT INTO positions (position_name,minimum) VALUES

('MCC',1),
('MCC-DNIC',1),
('MCCT',1),
('MCCT-DNIC',1),
('RSC',1),
('SD',1),
('SD - DNIC*',1),
('WD',2),
('ASO/T',2),
('TT',3),
('IDT',2),
('APM - DNIC',1),
('ICO/T',1),
('ICO/T - DNIC',1)

;
