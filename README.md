# Design & Thinking Questions

## 1. Why did you choose Supabase for this assignment?

I chose **Supabase** because it provides:

-   Authentication out of the box
-   PostgreSQL database
-   Row Level Security (RLS)
-   Easy integration with Next.js
-   Simple and developer-friendly setup

It is ideal for building this type of application quickly while still
following good architectural practices.

------------------------------------------------------------------------

## 2. When would you choose Firebase instead in production?

I would consider **Firebase** if:

-   The application requires heavy real-time features (e.g., chat, live
    collaboration)
-   The team prefers **NoSQL** over relational databases
-   Deep integration with **Google services** is required

**Summary:**
- Supabase → Better for structured data, relational schemas, and SQL
- Firebase → Better for real-time-first, NoSQL-heavy systems

------------------------------------------------------------------------

## 3. If this app suddenly gets 10,000 active users, what bottlenecks would you expect?

### a) Database Load

**Problem:** Increased read/write operations on the `tasks` table
**Solution:**
- Add proper indexes
- Implement pagination
- Introduce caching (e.g., Redis)

### b) Serverless API Scaling

**Problem:** High traffic on Vercel serverless functions
**Solution:**
- Use Edge Functions for read-heavy endpoints
- Consider moving to a dedicated backend service if load grows

### c) Session & Auth Overhead

**Problem:** Repeated authentication checks per request
**Solution:**
- Optimize middleware
- Reduce unnecessary auth calls
- Apply caching where possible

------------------------------------------------------------------------

## 4. One design or technical decision that is not ideal (due to time constraints)

The current assignment schema is intentionally minimal (only `id`,
`title`, `user_id`, timestamps).

In a real production system, I would add:

-   Task completion status
-   TanStack Query instead of custom data-fetching hooks
-   Validation schema (e.g., Zod)
-   Pagination
-   Better error boundaries
-   Activity / audit logs

For this assignment, I prioritized **correctness and clarity over
unmentioned requirements**.

------------------------------------------------------------------------

## 5. How would the system change if requirements evolve?

### If Supabase/Firebase is removed

-   Introduce a custom backend (Node.js/Express or similar)
-   Implement authentication using JWT
-   Move auth logic fully to backend for better security

The current architecture already separates concerns, so this change
would be manageable.

### If Role-Based Access Control (RBAC) is introduced

-   Add a `role` field to the `profiles` table
-   Enforce role checks in middleware and APIs
-   Update database policies to restrict actions based on role

### If Activity / Audit Logs are required

-   Create an `activity_logs` table with:
    -   `user_id`
    -   `action`
    -   `metadata`
    -   `timestamp`
-   Log important actions inside API routes
-   Optionally expose admin-only audit views
