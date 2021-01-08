To run,

docker build -t schedule-database:latest .

docker run -p 8000:5432 -d --name db schedule-database

if you need to make changes:

docker rm db

then do the steps above again.

Once you have the container running, some helpful cli to see your tables
- docker exec -it <container_name> /bin/sh;  ---- gets you to an interactive shell on the running container
- psql -U scheduler schedule   -----gets you to the db
- \dt  ------ shows tables in the db
- select * from <tablename>;     ----you know the drill from here with SQL queries