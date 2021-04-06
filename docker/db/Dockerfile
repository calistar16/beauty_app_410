FROM postgres:latest

# copy initialization script over to initialize database
COPY ./init.sql /docker-entrypoint-initdb.d/init.sql
