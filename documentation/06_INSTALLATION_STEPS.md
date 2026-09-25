# 06 — Installation Steps

For the examiner, and for any teammate setting up a new laptop.

---

## What you need

| Thing | Version | Where |
|-------|---------|-------|
| Node.js | 20 or newer (we used 24) | nodejs.org |
| A web browser | Chrome or Edge | already installed |

**That is everything.** No XAMPP, no MySQL, no Python, no database server.
SQLite is built into Node.js.

Check your version:
```
node --version
```

---

## Step 1 — Install the packages

Open Command Prompt in the project folder.

```
cd backend
npm install
```

```
cd ../frontend
npm install
```

Takes 2–3 minutes each the first time.

---

## Step 2 — Create the database

```
cd backend
npm run seed
```

You should see it create `backend/database/artmind.db` and report how many
paintings and users it added.

Safe to run again any time — it rebuilds the database from scratch.

---

## Step 3 — Add the painting images

Put your painting `.jpg` files into:

```
frontend/public/images/
```

The file names must match the ones listed in `backend/database/seed.js`.

---

## Step 4 — Make the AI work offline

**Do this before the final demo. Skip it and the AI needs internet.**

TensorFlow.js normally downloads MobileNet from Google every time the page loads.
We save the files into our own project instead.

1. Make sure you have internet, and start both servers (Step 5).
2. Open the Upload page in Chrome.
3. Press **F12** → click the **Network** tab.
4. Reload the page and let the AI load once.
5. In the Network list you will see the model files being downloaded:
   - one file called **`model.json`**
   - several files called **`group1-shard1of5`**, `group1-shard2of5`, and so on
6. Right-click each one → **Open in new tab** → save it into
   `frontend/public/model/`
7. Keep the exact file names. Do not rename anything.
8. In `frontend/src/ai/loadModel.js`, load from our own folder:

```js
const model = await mobilenet.load({
  version: 2,
  alpha: 1.0,
  modelUrl: '/model/model.json'
})
```

9. **Test it:** turn off your WiFi, reload the Upload page, and check the AI still
   works. If it does, you are safe for the demo.

> Doing it this way — reading the real file names off the Network tab — is more
> reliable than copying a URL from a tutorial, because the addresses change between
> versions.

---

## Step 5 — Run the website

You need **two** Command Prompt windows open at the same time.

**Window 1 — the backend:**
```
cd backend
npm start
```
Expect: `ArtMind backend running on http://localhost:5000`

> You will also see `ExperimentalWarning: SQLite is an experimental feature`.
> **This is normal.** It is a notice from Node, not an error.

**Window 2 — the website:**
```
cd frontend
npm run dev
```
Expect: `Local: http://localhost:5173`

Open **http://localhost:5173** in your browser.

> Or just double-click `run-backend.bat` then `run-frontend.bat`.

---

## Step 6 — Build the AI data (once)

1. Log in as `admin` / `admin123`
2. Go to **http://localhost:5173/admin/build-ai**
3. Click **Build AI Data** and wait

This runs MobileNet over every painting and saves the 1024 numbers into the database.
Takes a few seconds. Until you do this, recommendations and image recognition return
nothing.

Run it again whenever you add new paintings.

---

## If something goes wrong

| Problem | Cause | Fix |
|---------|-------|-----|
| `'npm' is not recognized` | Node.js not installed | Install from nodejs.org, then **close and reopen** Command Prompt |
| `Cannot find module 'express'` | Packages not installed | `cd backend` then `npm install` |
| `ExperimentalWarning: SQLite` | Nothing — it is a notice | Ignore it |
| Website loads but no paintings | Database not created | `cd backend` then `npm run seed` |
| `EADDRINUSE: port 5000` | Backend already running | Close the other window, or change the port in `backend/config.js` |
| Images show as broken boxes | Images missing or misnamed | Check `frontend/public/images/` against `seed.js` |
| AI says "model failed to load" | Model files missing | Redo Step 4 |
| Recommendations always empty | AI data never built | Redo Step 6 |
| Blank white page | A JavaScript error | Press F12, read the red text in Console |

---

## Before zipping for submission

- [ ] **Delete both `node_modules` folders** — they are about 300 MB
- [ ] Keep `backend/database/artmind.db` — the college asked for the database
- [ ] Keep `frontend/public/model/` — without it the AI needs internet
- [ ] Test the whole thing on a different laptop first
