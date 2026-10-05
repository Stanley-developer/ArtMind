-- CREATE TABLE statements - copy them from documentation/04_DATABASE_DESIGN.md

CREATE TABLE IF NOT EXISTS users (
    id            INTEGER PRIMARY KEY AUTOINCREMENT,
    username      TEXT    NOT NULL UNIQUE,
    email         TEXT    NOT NULL UNIQUE,
    password_hash TEXT    NOT NULL,
    is_admin      INTEGER NOT NULL DEFAULT 0,
    created_at    TEXT    NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS categories (
    id          INTEGER PRIMARY KEY AUTOINCREMENT,
    name        TEXT    NOT NULL UNIQUE,
    description TEXT
);

CREATE TABLE IF NOT EXISTS mediums (
    id   INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT    NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS paintings (
    id               INTEGER PRIMARY KEY AUTOINCREMENT,
    title            TEXT    NOT NULL,
    artist           TEXT    NOT NULL,
    description      TEXT,
    image_url        TEXT    NOT NULL,
    category_id      INTEGER,
    medium_id        INTEGER,
    surface          TEXT,
    year_created     INTEGER,
    price            REAL,
    embedding        TEXT,
    dominant_colours TEXT,
    ai_summary       TEXT,
    style            TEXT,
    view_count       INTEGER NOT NULL DEFAULT 0,
    created_at       TEXT    NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (category_id) REFERENCES categories(id),
    FOREIGN KEY (medium_id)   REFERENCES mediums(id)
);

CREATE INDEX IF NOT EXISTS idx_paintings_category ON paintings(category_id);
CREATE INDEX IF NOT EXISTS idx_paintings_medium   ON paintings(medium_id);
CREATE INDEX IF NOT EXISTS idx_paintings_views    ON paintings(view_count);

CREATE TABLE IF NOT EXISTS tags (
    id   INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT    NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS painting_tags (
    painting_id INTEGER NOT NULL,
    tag_id      INTEGER NOT NULL,
    PRIMARY KEY (painting_id, tag_id),
    FOREIGN KEY (painting_id) REFERENCES paintings(id) ON DELETE CASCADE,
    FOREIGN KEY (tag_id)      REFERENCES tags(id)      ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS favourites (
    user_id     INTEGER NOT NULL,
    painting_id INTEGER NOT NULL,
    created_at  TEXT    NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (user_id, painting_id),
    FOREIGN KEY (user_id)     REFERENCES users(id)     ON DELETE CASCADE,
    FOREIGN KEY (painting_id) REFERENCES paintings(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS view_history (
    id          INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id     INTEGER,
    painting_id INTEGER NOT NULL,
    viewed_at   TEXT    NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id)     REFERENCES users(id)     ON DELETE CASCADE,
    FOREIGN KEY (painting_id) REFERENCES paintings(id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_history_user ON view_history(user_id, viewed_at);

CREATE TABLE IF NOT EXISTS chat_logs (
    id              INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id         INTEGER,
    user_message    TEXT    NOT NULL,
    bot_reply       TEXT    NOT NULL,
    detected_intent TEXT,
    created_at      TEXT    NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS uploads (
    id                INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id           INTEGER,
    filename          TEXT    NOT NULL,
    detected_style    TEXT,
    detected_category TEXT,
    detected_colours  TEXT,
    uploaded_at       TEXT    NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
