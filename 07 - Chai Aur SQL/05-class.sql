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