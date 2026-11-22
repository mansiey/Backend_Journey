CREATE TABLE marks (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50),
    marks INT NOT NULL
);

INSERT INTO marks (name, marks) VALUES
('Mansi', '50'),
('Suraj', '50'),
('Ashtosh', '49'),
('Nisarg', '45'),
('Anu', '50');

SELECT * FROM marks;


CREATE INDEX idx_name ON marks(name);

EXPLAIN ANALYZE SELECT * FROM marks WHERE name = 'Mansi';