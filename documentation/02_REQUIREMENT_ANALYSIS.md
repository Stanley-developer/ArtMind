# 02 — Requirement Analysis

**Owner:** VICTOR

---

## 1. Functional requirements

What the system must **do**. Each one maps to files listed in `README.md` section 6.

### Visitor (not logged in)

| ID | Requirement |
|----|-------------|
| F01 | Browse all paintings in a grid |
| F02 | Filter by category (6 options) |
| F03 | Filter by medium (Oil, Watercolour, Acrylic, Canvas, Charcoal, Digital) |
| F04 | Search using a plain-English sentence |
| F05 | Open a painting and see its full details |
| F06 | See similar paintings on the details page |
| F07 | Chat with the AI assistant |
| F08 | Upload a photo and get it analysed |
| F09 | Download a painting's details as PDF or Word |
| F10 | Register an account |
| F11 | Log in and log out |

### Logged-in user — everything above, plus:

| ID | Requirement |
|----|-------------|
| F12 | Save a painting to favourites |
| F13 | Remove a painting from favourites |
| F14 | See all saved favourites |
| F15 | See recently viewed paintings on a dashboard |
| F16 | See their most-viewed categories |
| F17 | Get personalised suggestions |

### Admin — everything above, plus:

| ID | Requirement |
|----|-------------|
| F18 | Run the Build AI Data process |
| F19 | View analytics for the whole gallery |

---

## 2. Non-functional requirements

How well it must do it.

| ID | Requirement | How we meet it |
|----|-------------|----------------|
| N01 | **Works with no internet** | MobileNet files saved in `frontend/public/model/` |
| N02 | **Installs with no database server** | SQLite is built into Node 24 |
| N03 | Gallery loads in under 2 seconds | AI numbers are pre-computed, not calculated live |
| N04 | Works on phone, tablet and desktop | Bootstrap 5 responsive grid |
| N05 | Passwords never stored as plain text | Hashed with bcryptjs |
| N06 | Safe against SQL injection | Every query uses `?` placeholders |
| N07 | Uploads limited to safe image types | Only png, jpg, jpeg, webp; max 5 MB |
| N08 | No feature crashes the site when empty | Every empty result shows a friendly message |
| N09 | Any teammate can explain any file they own | One named owner per file |
| N10 | The whole project fits in one ZIP | `node_modules` excluded |

---

## 3. Hardware and software

### To develop

| Item | Requirement |
|------|-------------|
| OS | Windows 10 or newer (also works on Mac and Linux) |
| RAM | 4 GB minimum, 8 GB comfortable |
| Disk | About 1 GB, mostly `node_modules` |
| Node.js | Version 20 or newer |
| Editor | VS Code |
| Browser | Chrome or Edge |

### To run the finished project

Node.js and a browser. Nothing else.

---

## 4. Who uses what

| Role | Can do | Cannot do |
|------|--------|-----------|
| Visitor | Browse, filter, search, chat, upload, view details, export | Favourites, dashboard, admin |
| User | Everything a visitor can, plus favourites and dashboard | Admin pages |
| Admin | Everything, plus Build AI Data and analytics | — |

---

## 5. Data we store

| Data | Where | Why |
|------|-------|-----|
| Username, email | `users` | Login |
| Password hash | `users` | Login — never the real password |
| Painting details | `paintings` | The gallery |
| 1024 AI numbers | `paintings.embedding` | Similar paintings, image recognition |
| Dominant colours | `paintings.dominant_colours` | Colour search, AI summary |
| Favourites | `favourites` | Feature 6 |
| View history | `view_history` | Features 7 and 9 |
| Chat conversations | `chat_logs` | Feature 2, and proof for the viva |
| Uploaded photo records | `uploads` | Feature 4 |

Full column definitions are in `04_DATABASE_DESIGN.md`.

---

## 6. Assumptions

- The examiner has Node.js 20+, or can install it
- Painting images are supplied by us and placed in `frontend/public/images/`
- About 30 paintings is enough to demonstrate every feature
- Both servers run on the same machine (`localhost`)
- One user at a time — we are not testing for many simultaneous visitors

---

## 7. Constraints

| Constraint | Effect |
|------------|--------|
| 4 beginner students | No file is shared between two people |
| About 3 weeks | Scope fixed at the 9 required features, nothing extra |
| Must work offline at the demo | Rules out any paid API; model files stored locally |
| Must fit in one ZIP | `node_modules` deleted before zipping |
| Every line must be defensible | No library or technique nobody on the team understands |
