# 05 — Test Data and Test Cases

**Owner:** VICTOR
Fill in the Result and Date columns as you test. Screenshot anything that fails.

---

## Test data in the database

Created by `backend/database/seed.js`:

| Data | Amount |
|------|--------|
| Categories | 6 — Abstract, Landscape, Flower, Nature, Figurative, Religious |
| Mediums | 6 — Oil, Watercolour, Acrylic, Canvas, Charcoal, Digital |
| Users | 2 — `admin` / `admin123`, `student` / `student123` |
| Paintings | ~30, about 5 per category |

---

## Test cases

### Login and registration

| # | What we test | Steps | Expected | Result | Date |
|---|---|---|---|---|---|
| 1 | Valid login | `student` / `student123` | Logged in, name in NavBar | | |
| 2 | Wrong password | `student` / `wrongpass` | "Wrong username or password" | | |
| 3 | Username that does not exist | `nobody` / `test123` | Same message as #2 | | |
| 4 | Empty fields | Click Login with both blank | "Please fill in all fields" | | |
| 5 | Register new user | New username + email + password | Account created, logged in | | |
| 6 | Duplicate username | Register as `student` again | "That username is already taken" | | |
| 7 | Short password | Register with `abc` | "Password must be at least 6 characters" | | |
| 8 | Logout | Click Logout | Back to visitor, NavBar changes | | |
| 9 | Protected page while logged out | Open `/dashboard` | Sent to Login | | |

> #2 and #3 must show the **same** message. A different message would tell an attacker
> which usernames exist.

### Gallery and filters (Feature 3, 8)

| # | What we test | Steps | Expected | Result | Date |
|---|---|---|---|---|---|
| 10 | Gallery loads | Open `/gallery` | Paintings in a grid | | |
| 11 | Category filter | Click "Abstract" | Only Abstract paintings | | |
| 12 | Medium filter | Choose "Oil" | Only oil paintings | | |
| 13 | Both filters | Abstract + Oil | Only paintings matching both | | |
| 14 | Filter with no matches | A combination with none | "No paintings found" message | | |
| 15 | Clear filters | Click Clear | All paintings return | | |
| 16 | Paging | Click page 2 | Next set of paintings | | |
| 17 | Mobile view | Narrow the window | Grid stacks, nothing cut off | | |

### Painting details (Feature 6)

| # | What we test | Steps | Expected | Result | Date |
|---|---|---|---|---|---|
| 18 | Details open | Click a painting | Title, artist, surface, colours, description | | |
| 19 | AI summary | Look at the summary line | A readable sentence, not "undefined" | | |
| 20 | Similar paintings | Scroll down | 6 similar paintings shown | | |
| 21 | View is counted | Open, go back, check Analytics | Count went up by 1 | | |
| 22 | Save favourite | Click the heart | Turns filled, appears in Favourites | | |
| 23 | Favourite twice | Click the heart twice quickly | No error, saved once only | | |
| 24 | Remove favourite | Click again | Removed from Favourites | | |
| 25 | Favourite while logged out | Click heart as a visitor | Sent to Login | | |
| 26 | Download PDF | Click Download PDF | A PDF downloads and opens | | |
| 27 | Download Word | Click Download Word | A .docx downloads and opens | | |
| 28 | Painting that does not exist | Open `/painting/9999` | "Painting not found", no crash | | |

### Smart search (Feature 5)

| # | Search text | Expected | Result | Date |
|---|---|---|---|---|
| 29 | `Find nature oil paintings` | Understood: Nature + Oil | | |
| 30 | `blue abstract` | Understood: Abstract + colour blue | | |
| 31 | `mountain` | Understood as Landscape (synonym) | | |
| 32 | `watercolor flowers` | Works with US spelling too | | |
| 33 | `xyzabc123` | "No paintings found", no crash | | |
| 34 | (empty search) | No crash, shows everything or a prompt | | |
| 35 | `'; DROP TABLE paintings; --` | Treated as ordinary text, tables intact | | |

> #35 is the SQL injection test. It must do nothing. If the tables vanish, someone
> glued user text into SQL instead of using `?`.

### Chatbot (Feature 2)

| # | Message | Expected | Result | Date |
|---|---|---|---|---|
| 36 | `hello` | Friendly greeting | | |
| 37 | `Show blue abstract paintings` | Reply + matching paintings shown | | |
| 38 | `show me landscape paintings` | Reply + landscape paintings | | |
| 39 | `what can you do` | Explains itself with examples | | |
| 40 | `asdfgh` | "I did not understand", with an example | | |
| 41 | (empty message) | Asks the user to type something | | |
| 42 | Chat is saved | Check `chat_logs` in the database | The conversation is stored | | |

### Image recognition (Feature 4)

| # | What we test | Steps | Expected | Result | Date |
|---|---|---|---|---|---|
| 43 | Upload a painting | Choose a .jpg | Colours, style, category, similar works | | |
| 44 | Upload a PNG | Choose a .png | Works the same | | |
| 45 | Upload a .txt file | Choose a text file | "Only image files are allowed" | | |
| 46 | Upload a huge file | Over 5 MB | "File is too large" | | |
| 47 | Upload with no file | Click upload with nothing chosen | "Please choose a file" | | |
| 48 | **Works offline** | Turn off WiFi, upload again | Still works | | |
| 49 | Upload a non-painting | Upload a photo of a person | Returns something, no crash | | |

> #48 is the most important test in this document. If it fails, the model files are
> missing — redo Step 4 of `06_INSTALLATION_STEPS.md`.

### Dashboard and analytics (Features 7, 9)

| # | What we test | Steps | Expected | Result | Date |
|---|---|---|---|---|---|
| 50 | Recently viewed | View 3 paintings, open Dashboard | All 3 listed, newest first | | |
| 51 | Same painting twice | Open one painting 3 times | Listed once, not 3 times | | |
| 52 | Favourite categories | View several Abstract works | Abstract shown as top category | | |
| 53 | Suggestions | Check the suggestions | Paintings not already viewed | | |
| 54 | Brand new user | Register fresh, open Dashboard | Not blank — shows popular instead | | |
| 55 | Top paintings | Open Analytics | Sorted by view count | | |
| 56 | Category chart | Open Analytics | Bar chart with all 6 categories | | |

### Admin (Feature 1 setup)

| # | What we test | Steps | Expected | Result | Date |
|---|---|---|---|---|---|
| 57 | Build AI data | Log in as admin, run it | Progress shown, then "done" | | |
| 58 | Non-admin blocked | Open `/admin/build-ai` as `student` | Access denied | | |
| 59 | Recommendations before build | Fresh database, open a painting | Empty or fallback, **no crash** | | |

---

## Sign-off

| Section | Tested by | Date | All passed? |
|---------|-----------|------|-------------|
| Login and registration | | | |
| Gallery and filters | | | |
| Painting details | | | |
| Smart search | | | |
| Chatbot | | | |
| Image recognition | | | |
| Dashboard and analytics | | | |
| Admin | | | |

**Final check — on a different laptop, from the ZIP:**

- [ ] Followed `06_INSTALLATION_STEPS.md` exactly, start to finish
- [ ] All 9 features work
- [ ] Tested with WiFi off
- [ ] No red errors in the browser Console (F12)
