
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION pgcrypto;

SELECT uuid_generate_v4();
CREATE TABLE "products" (
    "prod_id" uuid DEFAULT uuid_generate_v4 () NOT NULL,
    "prod_name" VARCHAR NOT NULL,
    "price" NUMERIC,
    "category" VARCHAR NOT NULL,
    "prod_type" VARCHAR,
    "shades" VARCHAR[],
	"description" VARCHAR,
	"brand" VARCHAR,
	"ingredients" VARCHAR[],
    PRIMARY KEY ("prod_id")
);

CREATE TABLE "users" (
    "user_id" uuid DEFAULT uuid_generate_v4 () NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "admin" BOOLEAN,
    PRIMARY KEY ("user_id")
);

CREATE TABLE "collections" (
    "collection_id" uuid DEFAULT uuid_generate_v4 () NOT NULL,
    "collection_name" VARCHAR NOT NULL,
    "user_id" VARCHAR NOT NULL,
	"description" VARCHAR,
	"products" VARCHAR[],
    PRIMARY KEY ("collection_id")
);