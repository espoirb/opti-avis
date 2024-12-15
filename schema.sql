-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Drop existing table and policies if they exist
DROP POLICY IF EXISTS "Enable read access for all users" ON waitlist;
DROP POLICY IF EXISTS "Enable insert access for all users" ON waitlist;
DROP TRIGGER IF EXISTS set_waitlist_updated_at ON waitlist;
DROP FUNCTION IF EXISTS set_updated_at();
DROP TABLE IF EXISTS waitlist;

-- Create the waitlist table
CREATE TABLE waitlist (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    unique_id TEXT NOT NULL UNIQUE,
    company_profile JSONB NOT NULL,
    government_experience JSONB NOT NULL,
    target_markets TEXT[] NOT NULL,
    communication_preferences JSONB NOT NULL,
    business_goals TEXT[] NOT NULL,
    beta_testing JSONB NOT NULL,
    investment_range TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Create updated_at trigger
CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_waitlist_updated_at
    BEFORE UPDATE ON waitlist
    FOR EACH ROW
    EXECUTE FUNCTION set_updated_at();

-- Enable Row Level Security
ALTER TABLE waitlist ENABLE ROW LEVEL SECURITY;

-- Drop existing policies
DROP POLICY IF EXISTS "Allow anonymous select" ON waitlist;
DROP POLICY IF EXISTS "Allow anonymous insert" ON waitlist;
DROP POLICY IF EXISTS "Allow anonymous delete" ON waitlist;

-- Create new policies
CREATE POLICY "Allow anonymous select"
ON waitlist FOR SELECT
TO anon
USING (true);

CREATE POLICY "Allow anonymous insert"
ON waitlist FOR INSERT
TO anon
WITH CHECK (true);

CREATE POLICY "Allow anonymous delete"
ON waitlist FOR DELETE
TO anon
USING (true);

-- Grant necessary permissions to anon role
GRANT SELECT, INSERT, UPDATE, DELETE ON waitlist TO anon;