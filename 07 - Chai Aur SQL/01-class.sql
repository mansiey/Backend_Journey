-- CREATE TABLE students(
--     student_id SERIAL PRIMARY KEY,          --serial is auto incremented int, and primary key is unique and not null
--     first_name VARCHAR(50) NOT NULL,
--     last_name VARCHAR(50),
--     email VARCHAR(322) UNIQUE NOT NULL,
--     phone_number VARCHAR(10) UNIQUE,
--     country_code VARCHAR(4),
--     age INT CHECK (age > 12),
--     current_status VARCHAR(20) DEFAULT 'active' CHECK (current_status IN ('active', 'graduated', 'dropped_out')),
--     masterji_handle VARCHAR(50) UNIQUE,
--     has_joined_masterji BOOLEAN DEFAULT FALSE,
--     current_score INT DEFAULT 0 CHECK (current_score >= 0 AND current_score <= 100),
--     enrollment_date DATE DEFAULT CURRENT_DATE           --reserved variable => mostly UTC
-- );

--How to add/remove column in the DB
-- ALTER TABLE students
-- ADD COLUMN batch_name VARCHAR(50) DEFAULT 'web-dev 2026';

INSERT INTO students (first_name, last_name, email, phone_number, age, current_status, masterji_handle, has_joined_masterji, current_score)
VALUES ('John', 'Doe', 'john.doe@example.com', '9876543210', 22, 'active', '@john_codes', TRUE, 85.50);
