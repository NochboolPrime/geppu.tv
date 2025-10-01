-- Create users table
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  username VARCHAR(100) UNIQUE NOT NULL,
  avatar_url TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create releases table (anime titles)
CREATE TABLE IF NOT EXISTS releases (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  title_ru VARCHAR(255) NOT NULL,
  description TEXT,
  cover_image_url TEXT NOT NULL,
  year INTEGER,
  season VARCHAR(50),
  total_episodes INTEGER,
  status VARCHAR(50) DEFAULT 'ongoing',
  genres TEXT[],
  rating VARCHAR(10),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create episodes table
CREATE TABLE IF NOT EXISTS episodes (
  id SERIAL PRIMARY KEY,
  release_id INTEGER REFERENCES releases(id) ON DELETE CASCADE,
  episode_number INTEGER NOT NULL,
  title VARCHAR(255),
  vk_video_url TEXT NOT NULL,
  thumbnail_url TEXT,
  duration INTEGER,
  release_date DATE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(release_id, episode_number)
);

-- Create user_favorites table
CREATE TABLE IF NOT EXISTS user_favorites (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  release_id INTEGER REFERENCES releases(id) ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(user_id, release_id)
);

-- Create user_watch_history table
CREATE TABLE IF NOT EXISTS user_watch_history (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  episode_id INTEGER REFERENCES episodes(id) ON DELETE CASCADE,
  watched_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  progress INTEGER DEFAULT 0,
  UNIQUE(user_id, episode_id)
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_episodes_release_id ON episodes(release_id);
CREATE INDEX IF NOT EXISTS idx_episodes_release_date ON episodes(release_date);
CREATE INDEX IF NOT EXISTS idx_user_favorites_user_id ON user_favorites(user_id);
CREATE INDEX IF NOT EXISTS idx_user_watch_history_user_id ON user_watch_history(user_id);
