CREATE TABLE asset_request (
    `id` int NOT NULL AUTO_INCREMENT,
    `user_id` int,
    `sat_id` int,
    `pass_start` datetime,
    `pass_stop` datetime,
    `latitude` float NULL,
    `longitude` float NULL,
    `elevation` float NULL,
    `status` varchar(255),
    PRIMARY KEY (id)
);

INSERT INTO asset_request (`user_id`, `sat_id`, `pass_start`, `pass_stop`, `latitude`, `longitude`, `elevation`, `status`) VALUES
    (1, 1, '2020-12-14 12:07:07', '2020-12-14 18:07:07', 41.7532, -70.5385, 0, 'pending'),
    (4, 1, '2020-12-15 12:07:07', '2020-12-15 18:07:07', 41.7532, 70.5385, 0, 'pending'),
    (2, 1, '2020-12-31 23:59:00', '2021-01-01 00:01:00', -41.7532, -70.5385, 0, 'pending'),
    (3, 2, '2020-12-25 12:07:07', '2020-12-25 18:07:07', -41.7532, 70.5385, 0, 'pending')
;