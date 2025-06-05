-- Database schema for Trello clone
CREATE DATABASE IF NOT EXISTS trello_clone;
USE trello_clone;

-- Lists table
CREATE TABLE lists (
    id VARCHAR(36) PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    position INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Cards/Tickets table
CREATE TABLE cards (
    id VARCHAR(36) PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    list_id VARCHAR(36) NOT NULL,
    position INT NOT NULL,
    labels JSON,
    due_date DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (list_id) REFERENCES lists(id) ON DELETE CASCADE
);

-- Insert sample data for testing
INSERT INTO lists (id, title, position) VALUES 
('list-1', 'To Do', 0),
('list-2', 'In Progress', 1),
('list-3', 'Done', 2);

INSERT INTO cards (id, title, description, list_id, position, labels) VALUES 
('card-1', 'Design mockups', 'Create initial design mockups for the application', 'list-1', 0, '["Design", "High Priority"]'),
('card-2', 'Setup database', 'Configure MySQL database and create tables', 'list-2', 0, '["Backend"]'),
('card-3', 'Write documentation', 'Create comprehensive project documentation', 'list-3', 0, '["Documentation"]');