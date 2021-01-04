CREATE TABLE satellites (
    `id` int NOT NULL,
    `period` float NULL,
    `inclination` float NULL,
    `elset` int NULL,
    `rcs` float NULL,
    `mission_type` varchar(255),
    `status` int NULL,
    PRIMARY KEY (id)
);



INSERT INTO satellites (`id`, `period`, `inclination`, `elset`, `rcs`, `mission_type`, `status`) VALUES
    (22010, 98.23, 55.75, 170, 1.50, 'Naval Navigation', NULL),
    (25891, 96.45, 75.00, 60, 10.0, 'On-Orbit Missile Battery', NULL),
    (27005, 100.11, 30.5, 600, 5.6, 'European Communication Satellite', NULL),
    (30000, 99.99, 85.0, 450, 16.6, 'SIBRS', 3),
    (30001, 79.99, 85.0, 449, 16.6, 'SIBRS', 2),
    (30002, 59.99, 85.0, 447, 16.6, 'SIBRS', 1),
    (55555, 86.55, 65.55, 555, 5.55, 'ISS Elementary School Payload', NULL),
    (68554, 99.99, 78.65, 32, 100.50, 'NOT A SPY SATELLITE', 3),
    (77777, 100.77, 77.77, 45, 7.77, 'Gravity Assisted Propulsion', NULL),
    (78005, 96.50, 85.63, 23, 4.75, 'FTL Engine Testbed', NULL)
;