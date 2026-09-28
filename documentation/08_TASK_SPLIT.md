# 08 - Who Builds What

**Owner:** VICTOR

---

## The whole project in one picture

Think of ArtMind as a restaurant.

```
        THE DINING ROOM                    THE KITCHEN
     what the visitor sees            where the real work happens

     +-------------------+            +-------------------+
     |                   |            |                   |
     |   AMANDA          |  <----->   |   STANLEY         |
     |   SHALOM          |            |   VICTOR          |
     |                   |            |                   |
     |   React pages     |            |   Node server     |
     |   Buttons, cards  |            |   SQLite database |
     |   Colours, layout |            |   The AI thinking |
     |                   |            |                   |
     +-------------------+            +-------------------+
              FRONTEND                        BACKEND

              The waiter between them is one file: api.js
```

Two teams of two. The frontend team makes it look right. The backend team
makes it think. Neither works without the other, and they meet at exactly
one place, `frontend/src/api/api.js`.

---

## Start here: every file is empty

Every folder and every file in this project already exists. The code files
are **empty on purpose**. Each one has a single comment on line 1 saying
what it is for and who builds it.

```js
// Smart gallery with filters (Features 3 and 8) - Owner: AMANDA
```

If that is not your name, **do not touch it**. Ask the owner in the group
chat instead.

Four beginners editing the same file is how teams lose a week of work the
night before submission. This rule costs nothing and prevents all of it.

---

## How the frontend is split

The frontend is split **by feature, not by layer**. That means each person
builds her own pages **and** the small pieces those pages use.

We did it this way on purpose. If one person owned every component and the
other owned every page, they would have to agree on the name of every prop
before either could finish anything. Splitting by feature means each person
controls both sides of her own work and can change her mind without asking.

---

# FRONTEND TEAM

## AMANDA - Gallery and the AI

> **Your mission:** the browsing side of the site, and the AI that runs in
> the browser. When the examiner uploads a photo and the site recognises it,
> that is your work.

**You own 18 files.**

### Do these two first

| File | Why first |
|------|-----------|
| `main.jsx` | Turns React on. Nothing renders until this exists |
| `App.jsx` | The list of which web address shows which page |

Nobody on the team can see their own work until these two are written, so
please do them on day one.

### Your pages (5)

| File | What it shows |
|------|---------------|
| `pages/Home.jsx` | Welcome banner, the six categories, a trending strip |
| `pages/Gallery.jsx` | All paintings in a grid, with filters and the search bar |
| `pages/PaintingDetails.jsx` | One painting in full, with similar paintings |
| `pages/Upload.jsx` | Choose a photo, run the AI, show what it found |
| `pages/AdminBuildAI.jsx` | Admin only. Measures every painting once |

### Your components (8)

`PaintingCard` `PaintingGrid` `TestimonialCard` `SearchBar`
`CategoryFilter` `MediumFilter` `ColourSwatch` `SimilarPaintings`

These are the pieces your own pages use, so you decide what information
each one takes in.

### Your AI files (3)

| File | What it does |
|------|--------------|
| `ai/loadModel.js` | Loads MobileNet once and keeps it in memory |
| `ai/embedding.js` | Turns a picture into 1024 numbers |
| `ai/knn.js` | Guesses a category from the closest matches |

### Your order of work

1. `main.jsx` then `App.jsx`, so the site runs
2. `PaintingCard` and `PaintingGrid`, the two pieces everyone else waits on
3. `Home.jsx` and `Gallery.jsx`, plus the filter and search pieces
4. `PaintingDetails.jsx` with `ColourSwatch` and `SimilarPaintings`
5. `loadModel.js`, then `embedding.js`, then `knn.js`
6. `AdminBuildAI.jsx`, then `Upload.jsx`, which needs the AI files finished

### You must be able to explain

- What React Router does, and how `/painting/:id` hands the id to the page
- The difference between `useState` and `useEffect`, and when each runs
- Why `mobilenet.infer(img, true)` gives 1024 numbers instead of a label
- Why the AI runs in the browser and not on the server
- Why the numbers are worked out once and saved, instead of every visit

---

## SHALOM - The look, accounts and chat

> **Your mission:** how the whole site looks, plus the account pages and the
> chatbot. Every colour on this website is a decision you made.

**You own 18 files.**

### Do these three first

| File | Why first |
|------|-----------|
| `styles/app.css` | Every colour, font and size. Until this exists the site is plain black text |
| `components/NavBar.jsx` | The top menu, on every single page |
| `components/Footer.jsx` | The bottom of every page |

Amanda's `App.jsx` puts the menu bar and footer around every page, so the
whole team is waiting on these three.

### The plumbing (3)

| File | What it does |
|------|--------------|
| `api/api.js` | Every call to the backend, in one place |
| `context/UserContext.jsx` | Remembers who is logged in, for the whole site |
| `data/artworks.js` | Sample paintings, used until the backend is ready |

### Your pages (7)

| File | What it shows |
|------|---------------|
| `pages/Login.jsx` | The login form |
| `pages/Register.jsx` | The create account form |
| `pages/Favourites.jsx` | Paintings the user saved |
| `pages/Dashboard.jsx` | Recently viewed, favourite categories, suggestions |
| `pages/Analytics.jsx` | Most viewed paintings and a simple bar chart |
| `pages/Chatbot.jsx` | The chat screen |
| `pages/NotFound.jsx` | Shown when the web address does not exist |

### Your components (7)

`ChatWindow` `ChatMessage` `LoadingSpinner` `EmptyState`
`ProtectedRoute` (plus `NavBar` and `Footer` from above)

### Your order of work

1. `app.css`, starting with the `:root` block that holds all the colours
2. `NavBar` and `Footer`, so every page has a frame
3. `api.js`, `UserContext.jsx` and `artworks.js`
4. `Login.jsx` and `Register.jsx`, then `ProtectedRoute`
5. `Favourites.jsx` and `Dashboard.jsx`
6. `Analytics.jsx`, then `Chatbot.jsx` with `ChatWindow` and `ChatMessage`
7. `NotFound.jsx`, the smallest file in the project

### You must be able to explain

- What props are, using `ChatMessage` as the example
- Why every backend call goes through `api.js` instead of being scattered
- What the `:root` block does and why the colours live in one place
- Why the interface is almost colourless, because the paintings should be
  the only strong colour, which is what real galleries do
- How `ProtectedRoute` sends a logged out visitor to the login page

---

# BACKEND TEAM

## STANLEY - The foundation *(team leader)*

> **Your mission:** the server and the database. You go first. Until your
> part works, nobody can test anything against real data.

**You own 10 files.**

| File | What it does |
|------|--------------|
| `backend/server.js` | Starts everything. The file that runs |
| `backend/config.js` | Every setting in one place |
| `backend/database/schema.sql` | The nine tables |
| `backend/database/db.js` | Opens the database. Three small helpers |
| `backend/database/seed.js` | Creates the tables and adds about 30 paintings |
| `backend/routes/auth.js` | Register, login, logout |
| `backend/routes/paintings.js` | The gallery list and one painting |
| `backend/routes/favourites.js` | Save and remove favourites |
| `backend/routes/dashboard.js` | Recently viewed and suggestions |
| `backend/routes/analytics.js` | Most viewed paintings |

### Your order of work

1. `config.js`
2. `schema.sql`, copying the SQL straight from `04_DATABASE_DESIGN.md`
3. `db.js`, three small functions, nothing clever
4. `seed.js`, then run `npm run seed` and watch the database appear
5. `server.js`, connecting the route files
6. `routes/paintings.js`, which unblocks Amanda and Shalom
7. `auth.js`, then favourites, dashboard, analytics

### You must be able to explain

- Why SQLite instead of MySQL, because it is built into Node and needs
  no installing
- What a `?` placeholder is and how it stops SQL injection
- Why passwords are hashed with bcryptjs and never stored as plain text
- What a JOIN does, using the paintings and categories query
- How a session cookie keeps someone logged in

---

## VICTOR - The brain and the paperwork

> **Your mission:** the AI thinking on the server, and every document the
> college receives. Half the marks live in your half.

**You own 10 code files plus all documentation.**

| File | What it does |
|------|--------------|
| `backend/ai/similarity.js` | Cosine similarity between two lists of numbers |
| `backend/ai/recommend.js` | Similar and trending paintings |
| `backend/ai/chatbot.js` | Works out what the user typed |
| `backend/ai/smartSearch.js` | Turns an English sentence into filters |
| `backend/ai/summary.js` | Writes the AI summary sentence |
| `backend/ai/tags.js` | The tags shown on gallery cards |
| `backend/routes/search.js` | Smart search (Feature 5) |
| `backend/routes/chatbot.js` | Chatbot messages (Feature 2) |
| `backend/routes/recognise.js` | Image recognition (Feature 4) |
| `backend/routes/export.js` | PDF and Word download (Feature 6) |
| `documentation/` | All the documents, screenshots, video, both progress reports |

### Your order of work

1. `similarity.js` first. It is about 10 lines and three other files need it
2. `recommend.js`
3. `routes/recognise.js`, which receives the 1024 numbers from the browser
4. `chatbot.js` and `smartSearch.js`
5. `summary.js` and `tags.js`
6. `routes/export.js`
7. Documentation, all the way through

### You must be able to explain

- Everything in `09_AI_EXPLAINED.md`. Read it twice before writing a line
- The cosine similarity formula, and why we compare angle and not distance
- k nearest neighbour with k set to 5
- That the chatbot is rule based, and why that was the right choice here
- What the AI honestly cannot do

> The examiner will push hardest here. Saying that it is better at texture
> than at artistic style, because MobileNet was trained on photographs,
> earns more marks than pretending it is perfect.

---

## Where the two teams meet

Only one file connects them, and knowing this answers half the viva questions.

```
  AMANDA's page          SHALOM's api.js         STANLEY / VICTOR's routes
  -------------          ---------------         -------------------------
  Gallery.jsx    -->     getPaintings()   -->    GET /api/paintings
                                                         |
                                                         v
                                                  STANLEY's db.js
                                                         |
                                                         v
                                                   artmind.db
```

If a feature is broken, walk that chain. Whichever link is missing tells
you whose file it is.

---

## Git, how we work without stepping on each other

### Once, on your laptop

Set your name first, using the email on your GitHub account. If you skip
this, your work will not be credited to you.

```
git config --global user.name "Your Name"
git config --global user.email "your-github-email@gmail.com"
```

Then get the project and move onto your own branch.

```
git clone https://github.com/Stanley-developer/ArtMind.git
cd ArtMind
git checkout your-name
cd frontend
npm install
```

### Four branches are already waiting

`amanda` `shalom` `stanley` `victor`

Your branch is your first name in lowercase. Work on yours and nobody can
break your files.

### Every time you finish something

```
git checkout your-name
git pull origin main
git add .
git commit -m "Built the login page"
git push origin your-name
```

Keep the commit message to one short line.

### Getting your work into main

Open the repo on GitHub. You will see a green **Compare and pull request**
button. Click it, say what you did, and create it.

**One teammate has to approve it before it merges.** Nobody can push
straight to `main`, including Stanley. That is deliberate. It means two
people have seen every line we submit.

---

## The two deadlines that matter

### Checkpoint 1, day 7 to 10

- [ ] `main.jsx` and `App.jsx` written, the site runs - *Amanda*
- [ ] `app.css`, NavBar and Footer, the site has a look - *Shalom*
- [ ] Home page and Gallery showing paintings - *Amanda*
- [ ] Login and Register working - *Shalom*
- [ ] Database created, `npm run seed` fills it - *Stanley*
- [ ] `/api/paintings` returning real data - *Stanley*

Send a ZIP of the code so far, plus screenshots.
Victor prepares it. Stanley sends it.

### Checkpoint 2, seven to ten days later

- [ ] Similar paintings on the details page - *Victor*
- [ ] Image upload and recognition working - *Amanda and Victor*
- [ ] Chatbot answering - *Shalom and Victor*
- [ ] Smart search understanding sentences - *Victor*
- [ ] Dashboard and Analytics - *Shalom and Stanley*
- [ ] PDF and Word download - *Victor*

### Final week

| Task | Who |
|------|-----|
| Test everything on a different laptop | All |
| Record the demo video | Victor |
| Draw the flowchart, DFD and ER diagram | Victor |
| Save the MobileNet files so the AI works offline | Amanda |
| Delete both `node_modules` folders, then ZIP | Stanley |
| Fill the Status Report and Feedback Form | Stanley |

> The final ZIP can only be submitted once. Check everything twice.

---

## If you get stuck

Message the group after 30 minutes, not after three days.

A blocked teammate on day 3 is normal. A blocked teammate on day 19 is a
problem for all four of us.
