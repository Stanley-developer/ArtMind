# 08 — Who Builds What

**Owner:** VICTOR

---

## The whole project in one picture

Think of ArtMind as a restaurant.

```
        THE DINING ROOM                    THE KITCHEN
     what the visitor sees            where the real work happens

     ┌───────────────────┐            ┌───────────────────┐
     │                   │            │                   │
     │   AMANDA          │  ←─────→   │   STANLEY         │
     │   SHALOM          │            │   VICTOR          │
     │                   │            │                   │
     │   React pages     │            │   Node server     │
     │   Buttons, cards  │            │   SQLite database │
     │   Colours, layout │            │   The AI thinking │
     │                   │            │                   │
     └───────────────────┘            └───────────────────┘
              FRONTEND                        BACKEND

              The waiter between them is one file: api.js
```

Two teams of two. **The frontend team makes it look right. The backend
team makes it think.** Neither works without the other, and they meet at
exactly one place — `frontend/src/api/api.js`.

---

## The one rule that saves us

**Open any file. Line 1 tells you who owns it.**

```js
// Smart gallery with filters (Features 3 and 8) - Owner: AMANDA
```

If that is not your name, **do not touch it.** Ask the owner in the group
chat instead.

Four beginners editing the same file is how teams lose a week of work the
night before submission. This rule costs nothing and prevents all of it.

---

# 🎨 FRONTEND TEAM

## AMANDA — The Screens

> **Your mission:** every screen a visitor actually looks at.
> When the examiner clicks through the site, they are clicking through
> your work.

**You own 17 files**

| Folder | What is in it |
|--------|---------------|
| `frontend/src/pages/` | All 12 screens — Home, Gallery, Painting Details, Upload, Chatbot, Favourites, Dashboard, Analytics, Login, Register, AdminBuildAI, NotFound |
| `frontend/src/ai/` | The 3 TensorFlow.js files — this is the AI that runs **in the browser** |
| `frontend/src/App.jsx` | The map of which web address shows which page |
| `frontend/src/main.jsx` | The switch that turns React on |

**Three are already built for you** — Home, Gallery and PaintingDetails.
Open them, see the pattern, copy it. You are never starting from a blank page.

**Your order of work**

1. `Login.jsx` and `Register.jsx` — copy the form pattern from `SearchBar.jsx`
2. `Favourites.jsx` — it is Gallery with one filter removed
3. `NotFound.jsx` — about 6 lines using `EmptyState`
4. `Dashboard.jsx` and `Analytics.jsx`
5. `loadModel.js` → `embedding.js` → `AdminBuildAI.jsx` — **the big one**
6. `Upload.jsx` and `Chatbot.jsx` — these need your AI files working first

**You must be able to explain**
- What React Router does, and how `/painting/:id` hands the id to the page
- `useState` vs `useEffect` — which runs when
- Why `mobilenet.infer(img, true)` gives you 1024 numbers instead of a label
- Why the AI runs in the browser and not on the server

---

## SHALOM — The Look

> **Your mission:** the reusable pieces and the design. Every colour on
> this website is a decision you made.

**You own 20 files**

| Folder | What is in it |
|--------|---------------|
| `frontend/src/components/` | All 15 reusable pieces — NavBar, PaintingCard, SearchBar, ChatWindow and the rest |
| `frontend/src/styles/app.css` | **Every colour, font and size on the site** |
| `frontend/src/api/api.js` | The waiter. Every single call to the backend |
| `frontend/src/context/UserContext.jsx` | Remembers who is logged in |
| `frontend/src/data/artworks.js` | The sample paintings, until the backend is ready |
| `frontend/vite.config.js` | The proxy that lets the site talk to the server |

**All of this is already built.** Your job is to keep it consistent as the
site grows, and to be able to defend it.

Here is why your job matters most for how the project *looks*: because
every colour lives in your `app.css`, and every painting box is your
`PaintingCard`, **Amanda physically cannot make a page look wrong.**
She has no colours to choose. You removed that risk for the whole team.

**Your order of work**

1. Read `app.css` top to bottom — the `:root` block at the top holds all 10 colours
2. Read `api.js` — every backend address in the project is in that one file
3. As Amanda builds pages, add any new component she needs
4. Check every page on a phone before Checkpoint 1

**You must be able to explain**
- What props are — use `PaintingCard`, it is 16 lines
- Why every backend call goes through `api.js` instead of being scattered around
- What the `:root` block does and why colours live in one place
- Why the interface is almost colourless *(because the paintings should be
  the only strong colour — real galleries like Tate do exactly this)*
- How `ProtectedRoute` sends a logged-out visitor to the login page

---

# ⚙️ BACKEND TEAM

## STANLEY — The Foundation *(Team Leader)*

> **Your mission:** the server and the database. **You go first.**
> Until your part works, nobody can test anything against real data.

**You own 10 files**

| File | What it does |
|------|--------------|
| `backend/server.js` | Starts everything. The file that runs |
| `backend/config.js` | Every setting in one place |
| `backend/database/schema.sql` | The 9 tables |
| `backend/database/db.js` | Opens the database. Three tiny helpers |
| `backend/database/seed.js` | Creates the tables and adds ~30 paintings |
| `backend/routes/auth.js` | Register, login, logout |
| `backend/routes/paintings.js` | The gallery list and one painting |
| `backend/routes/favourites.js` | Save and remove favourites |
| `backend/routes/dashboard.js` | Recently viewed and suggestions |
| `backend/routes/analytics.js` | Most viewed paintings |

**Your order of work**

1. `config.js` — settings
2. `schema.sql` — copy the SQL straight from `04_DATABASE_DESIGN.md`
3. `db.js` — three small functions, nothing clever
4. `seed.js` — then run `npm run seed` and watch the database appear
5. `server.js` — connect the route files
6. `routes/paintings.js` — **this unblocks Amanda and Shalom**
7. `routes/auth.js`, then favourites, dashboard, analytics

**You must be able to explain**
- Why SQLite instead of MySQL — *it is built into Node 24, nothing to install*
- What a `?` placeholder is and how it stops SQL injection
- Why passwords are hashed with bcryptjs and never stored as text
- What a JOIN does — use the paintings + categories query
- How a session cookie keeps someone logged in

---

## VICTOR — The Brain & The Paperwork

> **Your mission:** the AI thinking on the server, and every document the
> college receives. Half the marks live in your half.

**You own 10 code files plus all documentation**

| Folder | What is in it |
|--------|---------------|
| `backend/ai/` | 6 files — similarity, recommend, chatbot, smartSearch, summary, tags |
| `backend/routes/search.js` | Smart search (Feature 5) |
| `backend/routes/chatbot.js` | The chatbot (Feature 2) |
| `backend/routes/recognise.js` | Image recognition (Feature 4) |
| `backend/routes/export.js` | PDF and Word download (Feature 6) |
| `documentation/` | **All 10 documents, screenshots, the video, both progress reports** |

**Your order of work**

1. `similarity.js` — cosine similarity, about 10 lines. **Do this first**, three files need it
2. `recommend.js` — similar and trending paintings
3. `routes/recognise.js` — receives the 1024 numbers from Amanda's browser code
4. `chatbot.js` and `smartSearch.js`
5. `summary.js` and `tags.js`
6. `routes/export.js` — PDF and Word
7. Documentation, all the way through

**You must be able to explain**
- **Everything in `09_AI_EXPLAINED.md`. Read it twice before you write a line.**
- The cosine similarity formula, and why we compare angle and not distance
- k-nearest-neighbour with k = 5
- That the chatbot is rule-based — and why that was the right choice
- **What the AI honestly cannot do** — the table at the end of `09_AI_EXPLAINED.md`

> The examiner will push hardest here. Saying *"it is better at texture than
> at artistic style, because MobileNet was trained on photographs"* earns more
> marks than pretending it is perfect.

---

## Where the two teams meet

Only one file connects them, and knowing this answers half the viva questions:

```
  AMANDA's page          SHALOM's api.js         STANLEY / VICTOR's routes
  ─────────────          ───────────────         ─────────────────────────
  Gallery.jsx    ──→     getPaintings()   ──→    GET /api/paintings
                                                         │
                                                         ▼
                                                  STANLEY's db.js
                                                         │
                                                         ▼
                                                   artmind.db
```

**If a feature is broken, walk that chain.** Whichever link is missing tells
you whose file it is.

---

## Git — how we work without stepping on each other

### Once, on your laptop

```
git clone <the repo address Stanley sends you>
cd ArtMind
cd frontend
npm install
```

### Every time you start work

A **branch** is your own private copy. You cannot break anyone else's work.

```
git checkout main
git pull
git checkout -b amanda-login
```

### When you have finished something

```
git add .
git commit -m "Built the login page"
git push -u origin amanda-login
```

Then open GitHub, click **Pull request**, and **Stanley reviews and merges it.**

**Nothing reaches `main` until Stanley approves it.** That is the whole safety net.

### Branch names

`yourname-whatyoudid` — for example `amanda-login`, `shalom-navbar`,
`victor-similarity`, `stanley-database`

### Four branches are already waiting for you

`amanda` · `shalom` · `stanley` · `victor`

Start from yours, or make a new one per task using the naming above.

---

## The two deadlines that matter

### ✅ Checkpoint 1 — day 7 to 10

**Must be working and screenshotted:**

- [ ] Database created, `npm run seed` fills it — *Stanley*
- [ ] `/api/paintings` returns real data — *Stanley*
- [ ] Homepage loads — *already done*
- [ ] Gallery shows paintings with working filters — *already done*
- [ ] Login and Register work — *Amanda + Stanley*

Send: a ZIP of the code so far, plus screenshots, via the Query/Status section.
**Victor prepares it. Stanley sends it.**

### ✅ Checkpoint 2 — 7 to 10 days later

- [ ] Similar paintings showing on the details page — *Victor*
- [ ] Image upload and recognition working — *Amanda + Victor*
- [ ] Chatbot answering — *Victor*
- [ ] Smart search understanding sentences — *Victor*
- [ ] Dashboard and Analytics — *Amanda + Stanley*
- [ ] PDF and Word download — *Victor*

### Final week

| Task | Who |
|------|-----|
| Test everything on a **different** laptop | All |
| Record the demo video | Victor |
| Draw the flowchart, DFD and ER diagram | Victor |
| Save the MobileNet files so the AI works offline | Amanda |
| **Delete both `node_modules` folders**, then ZIP | Stanley |
| Fill the Status Report and Feedback Form | Stanley |

> ⚠️ **The final ZIP can only be submitted once.** Check everything twice.

---

## If you get stuck

Message the group **after 30 minutes**, not after three days.

A blocked teammate on day 3 is normal. A blocked teammate on day 19 is a
problem for all four of us.
