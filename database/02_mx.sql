CREATE TABLE mx (
    `id` int NOT NULL AUTO_INCREMENT,
    `mx_id` varchar(255) NOT NULL,
    `mx_title` varchar(255) NOT NULL,
    `description` mediumtext NOT NULL,
    `sensors` text NULL,
    `type` SET('Scheduled','Unscheduled','Emergency') NOT NULL,
    `approved` SET('Pending','Approved','Unapproved') NOT NULL,
    PRIMARY KEY (id)
);

INSERT INTO mx (`mx_id`, `mx_title`, `description`, `sensors`, `type`, `approved`) VALUES
    ('101655', 'Monthly PMI', '304th SATCOM will be performing monthly PMIs and ground station at Area 51. Expected downtime is 6 hrs.', 'Sensor1', 'Scheduled', 'Approved'),
    ('101728', 'Lens Replacement', 'ISS crew will be replacing the lens on the super secret spy satellite. Expected downtime is 48hrs.', 'Sensor5', 'Scheduled', 'Approved'),
    ('102455', 'Satellite Re-entry', 'AFPSC will be de-orbiting Mil-Star 1 and burning it up in a fiery ball of death. Expected downtime is forever.', 'Sensor8', 'Unscheduled', 'Pending')
;