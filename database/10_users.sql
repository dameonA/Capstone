CREATE TABLE users (
    `id` int NOT NULL AUTO_INCREMENT,
    `first_name` varchar(255) NULL,
    `last_name` varchar(255),
    `phone_number` varchar(255),
    `email` varchar(255),
    `role` varchar(255),
    `password` varchar(255),
    PRIMARY KEY (id)
);

INSERT INTO users (`first_name`, `last_name`, `phone_number`, `email`, `role`, `password`) VALUES
    ('James', 'Bond', '440-700-0007', 'jbond@hmss.uk.gov', 'Secret Agent', 'shaken0tstirr3d'),
    ('Onatopp', 'Xenia', '666-666-6666', 'always@secret.org', 'Evil Villan', 'Iwi77licky0UrF@ce'),
    ('Grishenko', '', '123-456-7890', 'notyourbro@my.email', 'Super Hacker', 'youwillneverguessmypassword'),
    ('Simonova', 'Natalya', 'UNLISTED', 'natasimo@aol.com', 'Bond Girl', 'IwillGuessYourPassword')
;

