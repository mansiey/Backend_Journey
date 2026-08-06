CREATE TABLE students(
    student_id SERIAL PRIMARY KEY, --serial is auto incremented int, and primary key is unique and not null
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50),
    email VARCHAR(322) UNIQUE NOT NULL,
    phone_number VARCHAR(10) UNIQUE,
    country_code VARCHAR(4),

    age INT CHECK (age > 12),
    current_status VARCHAR(20) DEFAULT 'active' CHECK (current_status IN ('active', 'graduated', 'dropped_out')),

    masterji_handle VARCHAR(50) UNIQUE,

    has_joined_masterji BOOLEAN DEFAULT FALSE,

    
)