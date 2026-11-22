CREATE TABLE batches (
    student_id SERIAL PRIMARY KEY,
    subjects VARCHAR(50),
    college VARCHAR(50)
);


CREATE TABLE entrance(
    hall_ticket SERIAL PRIMARY KEY,
    centre VARCHAR(50),
    id INT REFERENCES batches(student_id) ON DELETE CASCADE               --> foreign key
);


INSERT INTO batches (subjects, college) VALUES
('PCM', 'Integrated'),
('PCM', 'Non-Integrated'),
('PCB', 'Integrated'),
('PCM', 'Integrated'),
('PCB', 'Non-Integrated');


SELECT * FROM batches;


INSERT INTO entrance (id, centre) VALUES 
('1', 'Dahisar'),
('2', 'Bandra'),
('3', 'Dadar'),
('5', 'Ghatkopar');

 
SELECT * FROM entrance;

