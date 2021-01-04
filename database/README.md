To run,

docker build -t spaceball-database:latest .

docker run -p 8000:3306 -d --name db spaceball-database

if you need to make changes:

docker rm db

then do the steps above again.