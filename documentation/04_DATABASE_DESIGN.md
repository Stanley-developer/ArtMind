# 04 — Database Design

**Database:** SQLite, one file at `backend/database/artmind.db`
**Accessed with:** `node:sqlite` — built into Node.js 24, nothing to install

> **STANLEY:** copy the SQL below into `backend/database/schema.sql`.

---

## Why SQLite

| Reason | Detail |
|--------|--------|
| Nothing to install | Node 24 has it built in. No XAMPP, no MySQL, no passwords |
| One file | `artmind.db` goes straight into the submission ZIP, as the college asked |
| Works everywhere | Any teammate can unzip and run it immediately |
| Real SQL | Same `SELECT`, `JOIN` and `WHERE` as MySQL — nothing is dumbed down |

You will see `ExperimentalWarning: SQLite is an experimental feature` when the server
starts. It is a notice, not an error. Ignore it.

---

## The tables

| Table | Holds | Used by |
|-------|-------|---------|
| `users` | Accounts | Login, favourites, dashboard |
| `categories` | The 6 categories | Feature 3 |
| `mediums` | Oil, Watercolour, Acrylic… | Feature 3 |
| `paintings` | The main table | Everything |
| `tags` + `painting_tags` | AI tags | Feature 8 |
| `favourites` | Saved paintings | Features 6, 7 |
| `view_history` | Who looked at what | Features 7, 9 |
| `chat_logs` | Saved conversations | Feature 2 |
| `uploads` | Recognised photos | Feature 4 |

---

## The SQL

```sql
-- 1. USERS
CREATE TABLE IF NOT EXISTS users (
    id            INTEGER PRIMARY KEY AUTOINCREMENT,
    username      TEXT    NOT NULL UNIQUE,
    email         TEXT    NOT NULL UNIQUE,
    password_hash TEXT    NOT NULL,
    is_admin      INTEGER NOT NULL DEFAULT 0,
    created_at    TEXT    NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- 2. CATEGORIES  (Abstract, Landscape, Flower, Nature, Figurative, Religious)
CREATE TABLE IF NOT EXISTS categories (
    id          INTEGER PRIMARY KEY AUTOINCREMENT,
    name        TEXT    NOT NULL UNIQUE,
    description TEXT
);

-- 3. MEDIUMS  (Oil, Watercolour, Acrylic, Canvas, Charcoal, Digital)
CREATE TABLE IF NOT EXISTS mediums (
    id   INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT    NOT NULL UNIQUE
);

-- 4. PAINTINGS  (the main table)
CREATE TABLE IF NOT EXISTS paintings (
    id           INTEGER PRIMARY KEY AUTOINCREMENT,
    title        TEXT    NOT NULL,
    artist       TEXT    NOT NULL,
    description  TEXT,
    image_url    TEXT    NOT NULL,
    category_id  INTEGER,
    medium_id    INTEGER,
    surface      TEXT,
    year_created INTEGER,
    price        REAL,

    -- The 1024 numbers MobileNet produced for this painting, stored as
    -- JSON text like "[0.12, 0.98, ...]". SQLite has no array type, so we
    -- store JSON as TEXT and use JSON.parse() to read it back.
    -- Filled in once by the AdminBuildAI page.
    embedding    TEXT,

    -- The main colours, as JSON text:
    -- [{"hex":"#1a3d6b","name":"deep blue","percent":34.2}, ...]
    dominant_colours TEXT,

    ai_summary   TEXT,
    style        TEXT,
    view_count   INTEGER NOT NULL DEFAULT 0,
    created_at   TEXT    NOT NULL DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (category_id) REFERENCES categories(id),
    FOREIGN KEY (medium_id)   REFERENCES mediums(id)
);

CREATE INDEX IF NOT EXISTS idx_paintings_category ON paintings(category_id);
CREATE INDEX IF NOT EXISTS idx_paintings_medium   ON paintings(medium_id);
CREATE INDEX IF NOT EXISTS idx_paintings_views    ON paintings(view_count);

-- 5. TAGS and PAINTING_TAGS
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

-- 6. FAVOURITES
CREATE TABLE IF NOT EXISTS favourites (
    user_id     INTEGER NOT NULL,
    painting_id INTEGER NOT NULL,
    created_at  TEXT    NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (user_id, painting_id),
    FOREIGN KEY (user_id)     REFERENCES users(id)     ON DELETE CASCADE,
    FOREIGN KEY (painting_id) REFERENCES paintings(id) ON DELETE CASCADE
);

-- 7. VIEW_HISTORY   (user_id is NULL for a visitor who is not logged in)
CREATE TABLE IF NOT EXISTS view_history (
    id          INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id     INTEGER,
    painting_id INTEGER NOT NULL,
    viewed_at   TEXT    NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id)     REFERENCES users(id)     ON DELETE CASCADE,
    FOREIGN KEY (painting_id) REFERENCES paintings(id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_history_user ON view_history(user_id, viewed_at);

-- 8. CHAT_LOGS
CREATE TABLE IF NOT EXISTS chat_logs (
    id              INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id         INTEGER,
    user_message    TEXT    NOT NULL,
    bot_reply       TEXT    NOT NULL,
    detected_intent TEXT,
    created_at      TEXT    NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- 9. UPLOADS
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
```

---

## Things the examiner will ask

**Why two tables for tags?**
One painting has many tags, and one tag belongs to many paintings. That is a
**many-to-many** relationship, and the correct way to store it is a joining table.
The word "blue" is stored once in `tags`, no matter how many paintings use it.

**Why is `PRIMARY KEY (user_id, painting_id)` on favourites?**
It is a **composite primary key**. It makes it impossible for the same user to
favourite the same painting twice — the database enforces it, so we do not have to
check in our code. Double-clicking the heart button is harmless.

**Why store the embedding as TEXT?**
SQLite has no array type. We convert the 1024 numbers to a JSON string with
`JSON.stringify()` before saving, and back with `JSON.parse()` when reading. It is
simple and we can see the data by opening the file.

**Why store the embedding at all instead of calculating it live?**
Running MobileNet on 30 paintings takes several seconds. Doing it on every page load
would make the site unusable. We calculate once and reuse. This is called
**pre-computing** — we trade a little storage for a much faster website.

**What is `ON DELETE CASCADE`?**
If a user is deleted, their favourites and history are deleted automatically. It stops
us leaving orphan rows pointing at a user who no longer exists.

**How do you stop SQL injection?**
We always use `?` placeholders:
```js
db.one('SELECT * FROM paintings WHERE id = ?', [id])   // safe
db.one('SELECT * FROM paintings WHERE id = ' + id)     // NEVER do this
```
The second version lets someone type SQL into our search box and delete our tables.

---

## ER diagram

Draw this in draw.io (free) and save the image into `documentation/screenshots/`.

```
   users ──┬──< favourites >──┬── paintings ──> categories
           │                  │       │
           ├──< view_history >┤       ├──> mediums
           │                  │       │
           ├──< chat_logs     │       └──< painting_tags >── tags
           │                  │
           └──< uploads       │
```
`──<` means "one to many".
