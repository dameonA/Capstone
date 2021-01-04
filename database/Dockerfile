FROM postgres:alpine

ENV POSTGRES_USER scheduler
ENV POSTGRES_PASSWORD schedule
ENV POSTGRES_DB schedule

COPY *.sql /docker-entrypoint-initdb.d/
