# 07 — Login IDs and Passwords

For the examiner. These accounts are created automatically by
`backend/database/seed.js`.

---

## Accounts

| Role | Username | Password | What it can do |
|------|----------|----------|----------------|
| Admin | `admin` | `admin123` | Everything, plus the Build AI Data page |
| User | `student` | `student123` | Browse, favourite, chat, upload, dashboard |

Log in at **http://localhost:5173/login**

---

## Admin-only page

**http://localhost:5173/admin/build-ai**

Runs MobileNet over every painting and saves the results into the database.
Needs to be run once after setup — see Step 6 of `06_INSTALLATION_STEPS.md`.

---

## About the passwords

The real passwords are **not** stored in the database. `seed.js` hashes them with
**bcryptjs** before saving, so the `users` table holds a long scrambled string like:

```
$2a$10$N9qo8uLOickgx2ZMRZoMye...
```

A hash cannot be reversed back into the password. When someone logs in we hash what
they typed and compare the two hashes.

> Expect the question: *"What if someone steals your database?"*
> Answer: they still cannot log in as anyone, because the passwords are not in it.

---

## Making more accounts

Register normally at **http://localhost:5173/register**.
New accounts are always normal users.

To make another admin, set `is_admin` to `1` for that user in
`backend/database/seed.js` and run `npm run seed` again.

> Note: re-running `seed.js` rebuilds the database from scratch and deletes any
> accounts registered through the website.

---

## Note for our own team

These are demo passwords for a college project, deliberately simple so the examiner can
type them. A real website would require longer passwords, rate-limit login attempts, and
never write credentials in a file like this one.

Saying that in the viva shows you know the difference.
