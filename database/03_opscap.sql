CREATE TABLE opscap (
    `id` int NOT NULL AUTO_INCREMENT,
    `radar_id` int NOT NUll,
    `mw_stat` int NOT NULL,
    `md_stat` int NOT NULL,
    `sda_stat` int NOT NULL,
    `details` varchar(225),
    PRIMARY KEY (id)
);

CREATE TABLE opscapstatus (
    `id` int NOT NUll,
    `color` varchar(225),
    PRIMARY KEY (id)
);

INSERT INTO opscap (`radar_id`, `mw_stat`, `md_stat`, `sda_stat`, `details`) VALUES
    (10, 1, 3, 4, 'MW down due to mx'),
    (10, 3, 1, 4, 'SDA down due to wx'),
    (10, 3, 2, 4, 'MD down for unk');

INSERT INTO opscapstatus (`id`, `color`) VALUES
    (1, 'red'),
    (2, 'yellow'),
    (3, 'green'),
    (4, 'white');
