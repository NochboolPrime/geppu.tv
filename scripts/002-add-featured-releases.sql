-- Add featured column to releases table for carousel management
ALTER TABLE releases ADD COLUMN IF NOT EXISTS featured BOOLEAN DEFAULT false;
ALTER TABLE releases ADD COLUMN IF NOT EXISTS featured_order INTEGER DEFAULT 0;

-- Create index for faster featured queries
CREATE INDEX IF NOT EXISTS idx_releases_featured ON releases(featured, featured_order);
