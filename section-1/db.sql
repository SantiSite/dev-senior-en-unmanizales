-- Create todo_app database
CREATE DATABASE todo_app;

-- Use todo_app database
\c todo_app;

-- Create tasks table
CREATE TABLE IF NOT EXISTS tasks (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    completed BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes
CREATE INDEX ON tasks (completed);
CREATE UNIQUE INDEX ON tasks (title);

-- Insert some data
INSERT INTO tasks (title, description) VALUES
('Task 1', 'Description 1'),
('Task 2', 'Description 2'),
('Task 3', 'Description 3');

-- Get all tasks
SELECT * FROM tasks;
