-- Supabase Tables for Venera Cosmetology
-- Run this in Supabase SQL Editor (Dashboard > SQL Editor > New Query)

-- =============================================
-- Contact Submissions Table
-- =============================================
CREATE TABLE IF NOT EXISTS contact_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(50),
  message TEXT NOT NULL,
  language VARCHAR(5) NOT NULL DEFAULT 'en',
  status VARCHAR(20) DEFAULT 'new',
  notes TEXT
);

-- Enable Row Level Security
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

-- Allow anonymous users to insert (public form submissions)
CREATE POLICY "Allow public inserts" ON contact_submissions
  FOR INSERT TO anon WITH CHECK (true);

-- Allow authenticated users to read all submissions
CREATE POLICY "Allow authenticated read" ON contact_submissions
  FOR SELECT TO authenticated USING (true);

-- Allow authenticated users to update (for admin dashboard)
CREATE POLICY "Allow authenticated update" ON contact_submissions
  FOR UPDATE TO authenticated USING (true);

-- =============================================
-- Booking Requests Table
-- =============================================
CREATE TABLE IF NOT EXISTS booking_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(50) NOT NULL,
  preferred_service VARCHAR(255) NOT NULL,
  preferred_date DATE,
  message TEXT,
  language VARCHAR(5) NOT NULL DEFAULT 'en',
  status VARCHAR(20) DEFAULT 'pending',
  notes TEXT
);

-- Enable Row Level Security
ALTER TABLE booking_requests ENABLE ROW LEVEL SECURITY;

-- Allow anonymous users to insert (public form submissions)
CREATE POLICY "Allow public inserts" ON booking_requests
  FOR INSERT TO anon WITH CHECK (true);

-- Allow authenticated users to read all requests
CREATE POLICY "Allow authenticated read" ON booking_requests
  FOR SELECT TO authenticated USING (true);

-- Allow authenticated users to update (for admin dashboard)
CREATE POLICY "Allow authenticated update" ON booking_requests
  FOR UPDATE TO authenticated USING (true);

-- =============================================
-- Indexes for better query performance
-- =============================================
CREATE INDEX IF NOT EXISTS idx_contact_submissions_created_at
  ON contact_submissions(created_at DESC);

CREATE INDEX IF NOT EXISTS idx_contact_submissions_status
  ON contact_submissions(status);

CREATE INDEX IF NOT EXISTS idx_booking_requests_created_at
  ON booking_requests(created_at DESC);

CREATE INDEX IF NOT EXISTS idx_booking_requests_status
  ON booking_requests(status);

CREATE INDEX IF NOT EXISTS idx_booking_requests_preferred_date
  ON booking_requests(preferred_date);
