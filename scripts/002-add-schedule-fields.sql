-- Add release_day column to releases table for schedule management
ALTER TABLE releases 
ADD COLUMN IF NOT EXISTS release_day INTEGER CHECK (release_day >= 0 AND release_day <= 6);

-- Add featured columns for carousel management
ALTER TABLE releases 
ADD COLUMN IF NOT EXISTS featured BOOLEAN DEFAULT false;

ALTER TABLE releases 
ADD COLUMN IF NOT EXISTS featured_order INTEGER DEFAULT 0;

-- Create index for better performance
CREATE INDEX IF NOT EXISTS idx_releases_featured ON releases(featured, featured_order);
CREATE INDEX IF NOT EXISTS idx_releases_release_day ON releases(release_day);
