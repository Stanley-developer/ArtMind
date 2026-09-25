# 03 — Design Diagrams

**Owner:** VICTOR

The college asks for a **Flowchart**, a **DFD** and an **ER diagram**.

Draw each one properly in **draw.io** (free, at app.diagrams.net), export as PNG into
`documentation/screenshots/`, and paste them into the final Word document.

The sketches below are the layouts to copy.

---

## 1. Flowchart — a visitor finding a painting

```
                    ( START )
                        |
              Open the ArtMind website
                        |
                   Home page
                        |
            +-----------+-----------+
            |           |           |
        Browse      Search       Upload
        gallery    a sentence    a photo
            |           |           |
            |      Pull out     Run MobileNet
            |      category,    in the browser
            |      medium,      -> 1024 numbers
            |      colour           |
            |           |           |
            +-----------+-----------+
                        |
                Search the database
                        |
                  < any results? >
                   /           \
                 NO             YES
                  |              |
          Show "nothing     Show the paintings
           found" + tips          |
                  |          User clicks one
                  |               |
                  |        Painting details page
                  |               |
                  |        Record the view
                  |               |
                  |        Compare 1024 numbers
                  |        against all paintings
                  |               |
                  |        Show 6 most similar
                  |               |
                  |        +------+------+
                  |        |      |      |
                  |     Save   Download  View
                  |   favourite  PDF/Word similar
                  |        |      |      |
                  +--------+------+------+
                                 |
                             ( END )
```

---

## 2. DFD Level 0 — context diagram

One process. Shows who talks to the system.

```
   +----------+                                   +----------+
   |          |  search, upload, chat, favourite  |          |
   | VISITOR  |---------------------------------->|          |
   |          |<----------------------------------|          |
   +----------+   paintings, AI results, replies  |          |
                                                   | ArtMind  |
   +----------+                                   |  System  |
   |          |  login, build AI data             |   (0)    |
   |  ADMIN   |---------------------------------->|          |
   |          |<----------------------------------|          |
   +----------+   analytics, view counts          +----------+
                                                        |
                                                        v
                                              +--------------------+
                                              | D1  artmind.db     |
                                              +--------------------+
```

---

## 3. DFD Level 1 — inside the system

```
 VISITOR
    |
    |-- 1. Browse & Filter -----------> D1 paintings, categories, mediums
    |         returns: painting list
    |
    |-- 2. Smart Search --------------> D1 paintings
    |      pulls category/medium/colour out of the sentence
    |
    |-- 3. Chatbot -------------------> D1 paintings
    |      finds intent + entities        D4 chat_logs (writes)
    |
    |-- 4. Image Recognition
    |      browser: photo -> 1024 numbers
    |      server: compare -------------> D1 paintings (embeddings)
    |                                     D5 uploads (writes)
    |
    |-- 5. View a Painting ------------> D1 paintings
    |         writes ------------------> D3 view_history
    |         triggers process 6
    |
    |-- 6. Recommend Similar ----------> D1 paintings (embeddings)
    |         cosine similarity
    |
    |-- 7. Favourites -----------------> D2 favourites (read/write)
    |
    |-- 8. Dashboard ------------------> D2 favourites, D3 view_history
    |
    +-- 9. Export PDF / Word ----------> D1 paintings

 ADMIN
    |
    +-- 10. Build AI Data
             browser: every painting -> 1024 numbers
             writes -------------------> D1 paintings.embedding

 DATA STORES
   D1 paintings / categories / mediums / tags
   D2 favourites
   D3 view_history
   D4 chat_logs
   D5 uploads
   D6 users
```

---

## 4. ER diagram

The tables and their relationships are in **`04_DATABASE_DESIGN.md`**.
Draw it from the table definitions there.

```
   users ──┬──< favourites >──┬── paintings ──> categories
           │                  │       │
           ├──< view_history >┤       ├──> mediums
           │                  │       │
           ├──< chat_logs     │       └──< painting_tags >── tags
           │                  │
           └──< uploads       │
```
`──<` means one-to-many.
`painting_tags` is a joining table for the many-to-many between paintings and tags.

---

## 5. How the AI request flows

Worth its own diagram — it is the part the examiner will focus on.

```
  BROWSER                              SERVER                DATABASE
  -------                              ------                --------
  User picks a photo
        |
  <img> element
        |
  MobileNet.infer(img, true)
        |
  1024 numbers
        |
        |------ POST /api/recognise ----->|
        |       { embedding: [...] }      |
        |                                 |
        |                          load all paintings
        |                                 |------------------>|
        |                                 |<------------------|
        |                                 |  stored embeddings
        |                                 |
        |                          cosine similarity
        |                          against each one
        |                                 |
        |                          sort, take top 6
        |                          k-NN on top 5 -> category
        |                                 |
        |<---- { category, similar } -----|
        |
  Show the result
```

**The point to make:** the neural network runs in the **browser**; the server only does
arithmetic. That is why nothing heavy needs installing on the server.

---

## Checklist

- [ ] Flowchart drawn in draw.io and exported as PNG
- [ ] DFD Level 0 drawn and exported
- [ ] DFD Level 1 drawn and exported
- [ ] ER diagram drawn and exported
- [ ] AI request flow drawn and exported
- [ ] All PNGs saved in `documentation/screenshots/`
- [ ] All pasted into the final Word document
