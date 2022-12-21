CREATE DATABASE yelp;
CREATE TABLE restaurants(
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    location VARCHAR(255),
    price_range INT
);