# ArtMind

An online painting gallery with AI features. It recommends similar paintings,
answers typed questions through a chatbot, recognises paintings from an uploaded
photo, and lets you search in plain English instead of keywords.

Aptech India eProject. Team of 4.

## Built with

| Part | Technology |
|------|-----------|
| Website | React 18 + Vite + Bootstrap 5 |
| Server | Node.js + Express |
| Database | SQLite (built into Node, nothing to install) |
| AI | TensorFlow.js + MobileNet, running in the browser |

## Before you start

You need **Node.js 22.5 or newer** (24 recommended), because the database uses
Node's built-in SQLite. Check what you have:

```
node --version
```

If it is older, install it from [nodejs.org](https://nodejs.org).

## Clone and install

```
git clone https://github.com/Stanley-developer/ArtMind.git
cd ArtMind

cd backend
npm install
npm run seed

cd ../frontend
npm install
```

`npm run seed` creates the database and fills it with sample paintings and the
demo users. Run it once.

`npm install` takes 2 to 3 minutes the first time.

## Run it

You need **two** terminal windows open at the same time.

**Window 1, the server:**
```
cd backend
npm start
```

**Window 2, the website:**
```
cd frontend
npm run dev
```

Then open **http://localhost:5173**

On Windows you can double-click `run-backend.bat` and `run-frontend.bat` instead.

> The server prints `ExperimentalWarning: SQLite is an experimental feature` on
> startup. That is not an error. Ignore it.

## Demo logins

| Role | Username | Password |
|------|----------|----------|
| Admin | `admin` | `admin123` |
| User | `student` | `student123` |

## Project layout

```
backend/          Express server, API routes, AI modules
  database/       schema, seed script, the SQLite file
frontend/src/     React pages and components
  ai/             TensorFlow.js code that turns a painting into numbers
documentation/    Project documents for submission
```

## Team

| Name | GitHub | Role |
|------|--------|------|
| **Stanley** | `Stanley-developer` | Backend: server and database *(team leader)* |
| **Victor** | *(to be added)* | Backend: server-side AI and documentation |
| **Amanda** | *(to be added)* | Frontend: pages and browser AI |
| **Shalom** | `Shalom1515` | Frontend: components and styling |

## Contributing

Before your first commit, set your identity on your own laptop, using the email
address on your GitHub account:

```
git config --global user.name "Your Name"
git config --global user.email "your-github-email@example.com"
```

To find your files: every file names its owner on line 1, and
`documentation/08_TASK_SPLIT.md` has the full breakdown per person.

Each person works on their own branch: `stanley`, `victor`, `amanda`, `shalom`.
`main` is protected, so work reaches it through a Pull Request that one teammate
approves.

```
git checkout your-name
git pull origin main
git add .
git commit -m "What you did"
git push origin your-name
```

Then open a Pull Request against `main` on GitHub.

**Only edit files you own.** If two people edit the same file, Git cannot tell
whose version is right and somebody loses work. Need a change in someone else's
file? Ask them.
