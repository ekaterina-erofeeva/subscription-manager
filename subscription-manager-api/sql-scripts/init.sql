-- Subscription plans table
CREATE TABLE subscription_plans (
    plan_id SERIAL NOT NULL PRIMARY KEY,
    name VARCHAR(50) UNIQUE NOT NULL,
    price NUMERIC(4,2) NOT NULL);

-- Services table
CREATE TABLE services (
    service_id SERIAL NOT NULL PRIMARY KEY,
    name VARCHAR(50) UNIQUE NOT NULL,
    description VARCHAR);

-- Subscription plans to services table
CREATE TABLE subs_services (
    id SERIAL NOT NULL PRIMARY KEY,
    plan_id INTEGER NOT NULL REFERENCES subscription_plans(plan_id),
    service_id INTEGER NOT NULL REFERENCES services(service_id));

-- User table
CREATE TABLE users (
    user_id SERIAL NOT NULL PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(50) UNIQUE NOT NULL,
    joined_at DATE,
    plan_id INTEGER REFERENCES subscription_plans(plan_id)
    );

--Add default subscription plans
INSERT INTO subscription_plans (name, price)
VALUES ('Basic', 9.99),
       ('Ultimate', 14.99),
       ('Premium', 19.99),
       ('Gold', 24.99);

-- Add example user
INSERT INTO users (first_name, last_name, email, plan_id)
values ('Judie', 'Garland', 'judie.garland@email.com', 3),
       ('John', 'Doe', 'john.doe@email.com', 2);