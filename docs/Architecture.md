# 🏗️ Architecture & Design Decisions

## 🧠 Backend (Django + PostgreSQL)

I chose **Django REST Framework (DRF)** for its robustness and speed of development. Unlike a simple Node.js server, Django provides a structured "batteries-included" approach that allowed me to focus on business logic rather than boilerplate.

### Key Decisions:
1.  **PostgreSQL over SQLite**:
    *   *Why?* SQLite locks the entire database file during a write operation. For a high-frequency leaderboard where scores are submitted concurrently, this would lead to `OperationalError: database is locked`.
    *   *Solution:* PostgreSQL supports Row-Level Locking, allowing multiple users to submit scores simultaneously without blocking reads.

2.  **Atomic Transactions (`transaction.atomic`)**:
    *   *Problem:* If a user submits a score, we create a `GameSession` and update the `Leaderboard`. If the leaderboard update fails but the session persists, data is inconsistent.
    *   *Solution:* Wrapped these operations in an atomic transaction. Either both succeed, or neither does.

3.  **Database Indexing**:
    *   Added `db_index=True` to `score` and `username` fields. This reduces lookup time from O(n) to O(log n), ensuring the leaderboard loads instantly even with 10k+ records.

---

## 🎨 Frontend (React + Vite)

The frontend is built with **React** and **Tailwind CSS**. I focused heavily on "Perceived Performance"—making the app *feel* instant.

### Key Decisions:
1.  **Video Background vs. 3D Canvas**:
    *   *Initial Thought:* Use Three.js to render a 3D Super Mario world.
    *   *Pivot:* On testing, Three.js consumed 40% CPU on a laptop. I switched to a high-quality looped video (`<video>`) with `object-fit: cover`.
    *   *Result:* CPU usage dropped to <5%, and it looks just as good!

2.  **Optimistic UI Updates**:
    *   When you click "Submit", the "1UP" animation triggers *immediately*. We don't wait for the server to say "OK" to show the user fun feedback.

3.  **Polling vs. WebSockets**:
    *   For this scale, I essentially implemented "Short Polling" (fetching every 5s).
    *   *Trade-off:* WebSockets would be faster but require a heavy stateful server (Redis/Channels). Polling is stateless, cacheable, and easier to scale horizontally on serverless platforms like Render.
