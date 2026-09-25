# 01 — Problem Definition

**Project:** AI-Driven ArtMind — Painting Website with AI
**Team:** 4 students
**Owner of this document:** VICTOR

---

## 1. The problem

Most online painting galleries are just photo albums. They have three weaknesses:

1. **You must already know what you want.** Search only works if you type the exact
   title or artist name. A visitor who wants "something calm and blue for a bedroom"
   has no way to ask for that.
2. **Nothing is suggested to you.** After viewing a painting, you are left to browse
   page after page on your own. The site never says "you might also like these".
3. **You cannot search with a picture.** If you photograph a painting you saw
   somewhere and want similar ones, there is no way to use that photo.

The result: visitors see a small fraction of the collection and leave.

---

## 2. Our solution

ArtMind is a painting gallery that understands both **pictures** and **plain English**.

- Viewing one painting suggests visually similar ones automatically
- You can type a normal sentence — "Find nature oil paintings" — and it understands
- You can upload a photo and get back its colours, a category guess, and similar works
- A chatbot answers questions about the collection
- The site remembers what you looked at and personalises your dashboard

---

## 3. Who it is for

| User | What they need |
|------|----------------|
| Art buyer | Find paintings matching a colour scheme or room |
| Student / researcher | Browse by style and medium, export details |
| Casual visitor | Discover paintings without knowing what to search for |
| Gallery owner (admin) | See which paintings get the most attention |

---

## 4. Scope — what we are building

| # | Feature | What it does |
|---|---------|--------------|
| 1 | Recommendation system | Similar paintings by colour, style and tags |
| 2 | Chatbot | Understands typed requests and explains paintings |
| 3 | Smart categories | 6 categories + filter by medium and surface |
| 4 | Image recognition | Upload a photo → style, colours, category, similar works |
| 5 | Smart search | Understands plain-English sentences |
| 6 | Painting details | Full information, AI summary, PDF/Word export, favourites |
| 7 | User dashboard | Recently viewed, favourite categories, suggestions |
| 8 | Smart gallery | Responsive grid with AI-generated tags |
| 9 | Analytics | Most viewed and most popular paintings |

---

## 5. Out of scope

Saying clearly what we did **not** build is part of a good problem definition.

- No payment or checkout
- No artist accounts — admin adds paintings
- No mobile app (the website is responsive, but is not a native app)
- No multi-language support
- No email sending or password reset

---

## 6. Technology and why

| Part | Choice | Reason |
|------|--------|--------|
| Frontend | React 18 + Vite + Bootstrap 5 | Component-based, so 4 people can work in parallel |
| Backend | Node.js + Express | Same language as the frontend — one language to learn |
| Database | SQLite via `node:sqlite` | Built into Node 24; one file; ships inside the ZIP |
| AI | TensorFlow.js + MobileNet | A real pre-trained network, running in the browser |

See `09_AI_EXPLAINED.md` for how the AI works and what it honestly cannot do.

---

## 7. What success looks like

- [ ] All 9 features work end to end
- [ ] The site runs on a fresh laptop from the ZIP, following `06_INSTALLATION_STEPS.md`
- [ ] The AI works with **no internet connection**
- [ ] Every team member can explain their own files
- [ ] Every team member can explain, in one sentence, how the AI works

---

## 8. Risks we identified

| Risk | How we handled it |
|------|-------------------|
| AI needs internet during the demo | Model files saved into `frontend/public/model/` |
| Database hard to install on 4 laptops | SQLite is built into Node — nothing to install |
| 4 people editing the same file | Every file has one named owner |
| Running out of time | Two checkpoints with a fixed list of what must work |
| Cannot explain the AI in the viva | `09_AI_EXPLAINED.md` written before coding started |
