CREATE TABLE asset_request_message (
    `id` int NOT NULL AUTO_INCREMENT,
    `user_id` int,
    `time_stamp` datetime,
    `text` varchar(255),
    `asset_request_id` int,
    PRIMARY KEY (id)
);

INSERT INTO asset_request_message (`user_id`, `time_stamp`, `text`, `asset_request_id`) VALUES
    (1, '2020-12-14 12:07:07', 'Need this, no questions asked', 1),
    (2, '2020-12-13 12:08:08', 'James made me do it', 2),
    (3, '2020-12-10 23:59:00', 'Up late, thinking this will make a great New Year celebration!', 3),
    (4, '2020-12-01 03:37:37', 'This will ruin eveyones holiday', 4)
;