-- Add release_day column to releases table
ALTER TABLE releases ADD COLUMN IF NOT EXISTS release_day INTEGER;

-- Update existing releases with release days (0 = Sunday, 1 = Monday, etc.)
-- This is example data - you can update it based on actual release schedules
UPDATE releases SET release_day = 1 WHERE id = 1; -- Monday
UPDATE releases SET release_day = 2 WHERE id = 2; -- Tuesday
UPDATE releases SET release_day = 3 WHERE id = 3; -- Wednesday
UPDATE releases SET release_day = 4 WHERE id = 4; -- Thursday
UPDATE releases SET release_day = 5 WHERE id = 5; -- Friday
UPDATE releases SET release_day = 6 WHERE id = 6; -- Saturday
UPDATE releases SET release_day = 0 WHERE id = 7; -- Sunday
