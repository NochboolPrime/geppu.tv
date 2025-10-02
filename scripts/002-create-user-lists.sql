-- Create user_lists table for tracking anime watch status
CREATE TABLE IF NOT EXISTS user_lists (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  release_id INTEGER REFERENCES releases(id) ON DELETE CASCADE,
  status VARCHAR(50) NOT NULL CHECK (status IN ('watching', 'completed', 'on_hold', 'dropped', 'planned')),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(user_id, release_id)
);

-- Create index for better query performance
CREATE INDEX IF NOT EXISTS idx_user_lists_user_id ON user_lists(user_id);
CREATE INDEX IF NOT EXISTS idx_user_lists_status ON user_lists(status);
CREATE INDEX IF NOT EXISTS idx_user_lists_user_status ON user_lists(user_id, status);

-- Drop the old user_favorites table since it's replaced by user_lists
-- Users can now use the 'planned' or 'watching' status instead
DROP TABLE IF EXISTS user_favorites CASCADE;
