-- Supabase migration for Trello clone
-- Run this in your Supabase SQL editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Lists table
CREATE TABLE lists (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255) NOT NULL,
    position INTEGER NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Cards/Tickets table
CREATE TABLE cards (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255) NOT NULL,
    description TEXT,
    list_id UUID NOT NULL REFERENCES lists(id) ON DELETE CASCADE,
    position INTEGER NOT NULL,
    labels JSONB DEFAULT '[]',
    due_date DATE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for better performance
CREATE INDEX idx_lists_position ON lists(position);
CREATE INDEX idx_cards_list_id ON cards(list_id);
CREATE INDEX idx_cards_position ON cards(list_id, position);

-- RLS (Row Level Security) policies - enable if needed
-- ALTER TABLE lists ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE cards ENABLE ROW LEVEL SECURITY;

-- Create policies for public access (modify as needed for authentication)
-- CREATE POLICY "Allow all operations on lists" ON lists FOR ALL USING (true);
-- CREATE POLICY "Allow all operations on cards" ON cards FOR ALL USING (true);

-- Insert sample data for testing
INSERT INTO lists (id, title, position) VALUES 
('550e8400-e29b-41d4-a716-446655440001', 'To Do', 0),
('550e8400-e29b-41d4-a716-446655440002', 'In Progress', 1),
('550e8400-e29b-41d4-a716-446655440003', 'Done', 2);

INSERT INTO cards (id, title, description, list_id, position, labels) VALUES 
('550e8400-e29b-41d4-a716-446655440011', 'Design mockups', 'Create initial design mockups for the application', '550e8400-e29b-41d4-a716-446655440001', 0, '["Design", "High Priority"]'),
('550e8400-e29b-41d4-a716-446655440012', 'Setup database', 'Migrate from MySQL to Supabase database', '550e8400-e29b-41d4-a716-446655440002', 0, '["Backend"]'),
('550e8400-e29b-41d4-a716-446655440013', 'Write documentation', 'Create comprehensive project documentation', '550e8400-e29b-41d4-a716-446655440003', 0, '["Documentation"]');