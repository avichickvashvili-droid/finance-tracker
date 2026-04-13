-- =============================================================
-- Finance Tracker — Database Schema
-- =============================================================
-- Run once to initialize the database from scratch:
--   psql -U postgres -d finance_tracker -f db/schema.sql
--
-- Uses IF NOT EXISTS on all tables so re-runs are safe.
-- Schema changes belong in db/migrations/, not here directly.
-- =============================================================

-- -------------------------------------------------------------
-- USERS
-- Prepared for future auth; not wired to app logic yet.
-- -------------------------------------------------------------
CREATE TABLE IF NOT EXISTS users (
  id         SERIAL PRIMARY KEY,
  name       VARCHAR(100),
  email      VARCHAR(100) UNIQUE,
  created_at TIMESTAMP DEFAULT NOW()
);

-- -------------------------------------------------------------
-- CATEGORIES
-- Reference list for transaction categorisation.
-- -------------------------------------------------------------
CREATE TABLE IF NOT EXISTS categories (
  id   SERIAL PRIMARY KEY,
  name VARCHAR(50) UNIQUE NOT NULL,
  type VARCHAR(20) CHECK (type IN ('income', 'expense'))
);

-- Seed default categories (idempotent)
INSERT INTO categories (name, type) VALUES
  ('Salary',        'income'),
  ('Freelance',     'income'),
  ('Investment',    'income'),
  ('Food',          'expense'),
  ('Transport',     'expense'),
  ('Housing',       'expense'),
  ('Healthcare',    'expense'),
  ('Entertainment', 'expense'),
  ('Shopping',      'expense'),
  ('Utilities',     'expense'),
  ('Other',         'expense')
ON CONFLICT (name) DO NOTHING;

-- -------------------------------------------------------------
-- TRANSACTIONS
-- Core table. user_id FK is commented out until auth is added.
-- -------------------------------------------------------------
CREATE TABLE IF NOT EXISTS transactions (
  id          SERIAL PRIMARY KEY,
  amount      NUMERIC        NOT NULL CHECK (amount > 0),
  type        VARCHAR(20)    NOT NULL CHECK (type IN ('income', 'expense')),
  category    VARCHAR(50),
  description TEXT,
  date        TIMESTAMP,
  created_at  TIMESTAMP      DEFAULT NOW()
  -- user_id  INT REFERENCES users(id) ON DELETE CASCADE  -- enable with auth
);
