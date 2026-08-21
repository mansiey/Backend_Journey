-- CREATE TABLE ipl_players (
--     player_id SERIAL PRIMARY KEY,
--     name VARCHAR(100) NOT NULL,
--     team VARCHAR(50),
--     role VARCHAR(50),
--     runs_scored INT CHECK(runs_scored > 0),
--     wicket_taken INT CHECK(wicket_taken > 0),
--     auction_price_crores INT
-- );


-- ALTER TABLE ipl_players
-- ADD COLUMN nicknames VARCHAR(50);


-- -- Inserting Data (Mix of real and funny fictitious stats)
-- INSERT INTO ipl_players (name, team, role, runs_scored, wicket_taken, auction_price_crores, nicknames) VALUES
-- ('Virat Kohli', 'RCB', 'Batsman', 973, 1, 15.00, 'King Kohli'),
-- ('MS Dhoni', 'CSK', 'Wicketkeeper', 450, 1, 12.00, 'Thala'),
-- ('Jasprit Bumrah', 'Mumbai Indians', 'Bowler', 15, 27, 12.00, 'Jassi'),
-- ('Hardik Pandya', 'Mumbai Indians', 'All-Rounder', 400, 15, 15.00, 'Kung Fu Pandya'),
-- ('Sunil Narine', 'KKR', 'All-Rounder', 350, 20, 8.50, 'Carrom King'),
-- ('Rohit Sharma', 'Mumbai Indians', 'Batsman', 550, 1, 16.00, 'Hitman'),
-- ('Rashid Khan', 'Gujarat Titans', 'Bowler', 50, 19, 15.00, 'The Magician'),
-- ('Rinku Singh', 'KKR', 'Batsman', 475, 1, 0.55, 'The Spirit'),
-- ('Arjun Tendulkar', 'Mumbai Indians', 'Bowler', 10, 3, 0.30, 'Arjun'),
-- ('Kane Williamson', 'LSG', 'Batsman', 600, 1, 11.00, 'Kane Mama'),
-- ('Mystery Player', NULL, 'Batsman', 1, 1, 1.00, 'Mystery Man');

-- SELECT * FROM ipl_players;

-- SELECT name, nicknames, team FROM ipl_players;

-- SELECT * FROM ipl_players WHERE team = 'CSK';


-- ***** Pattern Matching ******

-- ** Q: Find all players name that contain a at the 2nd posriton 

SELECT * FROM ipl_players WHERE name LIKE '_a%';


-- *** Q: All the players getting amount between 10-15 cr

SELECT * FROM ipl_players WHERE auction_price_crores BETWEEN 10 AND 15;


-- ** Sorting

SELECT name, nicknames, auction_price_crores FROM ipl_players ORDER BY auction_price_crores DESC;

SELECT team, name, auction_price_crores FROM ipl_players ORDER BY team ASC, auction_price_crores DESC;

