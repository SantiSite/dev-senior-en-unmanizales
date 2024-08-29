-- Create todo_app database
CREATE DATABASE todo_app;

-- Use todo_app database
\c todo_app;

-- Create tasks table
CREATE TABLE IF NOT EXISTS tasks (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    is_completed BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes
CREATE INDEX idx_tasks_created_at_desc ON tasks (created_at DESC);
CREATE INDEX idx_tasks_title_full_text_search ON tasks USING GIN (to_tsvector('spanish', title));
CREATE INDEX idx_tasks_description_full_text_search ON tasks USING GIN (to_tsvector('spanish', description));

-- Insert some data
INSERT INTO tasks (title, description) VALUES
('Task 1', 'Description 1'),
('Task 2', 'Description 2'),
('Task 3', 'Description 3');

-- Get all tasks
SELECT * FROM tasks;

-- Create users table
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(72) NOT NULL,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- Install pgcrypto extension
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- Insert some data inside users table
INSERT INTO users (name, email, password)
VALUES ('Pepito Perez', 'pepitoperez@gmail.com', crypt('Test-12345678', gen_salt('bf', 10)));

-- Create user_id column in tasks table
ALTER TABLE tasks ADD COLUMN user_id INT NULL;

-- Add foreign key constraint
ALTER TABLE tasks ADD CONSTRAINT fk_tasks_users_id FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE RESTRICT;

-- Update user_id column in tasks table
UPDATE tasks SET user_id = 1;
ALTER TABLE tasks ALTER COLUMN user_id SET NOT NULL;

-- Create email unique index
CREATE UNIQUE INDEX idx_users_email_unique ON users(email);
