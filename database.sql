
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    role VARCHAR(50) NOT NULL,
    dateCreate TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    profile_id INT REFERENCES profiles(id)
);


CREATE TABLE profiles (
    id SERIAL PRIMARY KEY,
    firstName VARCHAR(255) NOT NULL,
    lastName VARCHAR(255) NOT NULL,
    state VARCHAR(50) NOT NULL
);