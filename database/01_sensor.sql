CREATE TABLE sensors (
    `id` int NOT NULL AUTO_INCREMENT,
    `category` varchar(255),
    `sat_id` int NULL,
    `designation` varchar(255),
    `base` varchar(255),
    `latitude` float NULL,
    `longitude` float NULL,
    `altitude` float NULL,
    `max_range` int NULL,
    PRIMARY KEY (id)
);

INSERT INTO sensors (`category`, `sat_id`, `designation`, `base`, `latitude`, `longitude`, `altitude`, `max_range`) VALUES
    ('Ground Based Radar', NULL, 'COD', 'Cape Cod Air Force Station', 41.7532, -70.5385, NULL, 5000),
    ('Ground Based Radar', NULL, 'BLE', 'Beale Air Force Base', 39.136111, -121.436389, NULL, 5000),
    ('Ground Based Radar', NULL, 'THL', 'Thule Air Base', 76.531111, -68.703056, NULL, 5000),
    ('Ground Based Radar', NULL, 'CLR', 'Clear Air Force Station', 64.290556, -149.186944, NULL, 5000)
;