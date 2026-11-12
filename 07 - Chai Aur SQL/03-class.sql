-- CREATE TABLE book_list(
--     book_id SERIAL PRIMARY KEY,
--     book_name VARCHAR(100),
--     author_name VARCHAR(100)
-- )

INSERT INTO book_list 
(book_name, author_name)
VALUES
('Forty rules of love', 'Elif Shafaq'),
('Yellow Face', 'Rebecca F. Kuang');



DELETE FROM book_list
WHERE book_id = 3 OR book_id = 4;    -- WHERE book_id IN (3, 4)   --> alternate way


SELECT * FROM book_list;


INSERT INTO book_list 
(book_name, author_name)
VALUES
('Morisaki BookShop', 'satoshi'),
('Palace of Illusions', 'Chitra Banarjee');

SELECT * FROM book_list;


ALTER TABLE book_list
ADD COLUMN Rating VARCHAR(100);

UPDATE book_list
SET rating = 5;


SELECT * FROM book_list;
