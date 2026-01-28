1. Why did you choose Firebase or Supabase for this assignment?
Superbase provides authentication, PostgreSQL database, and Row Level Security out of the box so it is ideal for building this type of apps 
It integrates well and is pretty easy to use.


2. What would make you choose Firebase instead in production?

I would consider Firebase if:
  - The application requires heavy real-time features (chat, collaboration)
  - The team prefers NoSQL over relational databases
  - Deep integration with Google services is needed
Supabase is better suited when relational data, structured schemas, and SQL querying are important.


3. If this app suddenly gets 10,000 active users,what are the first 3 problems or bottlenecks you expect, and how would you address them?
    - Database load
       Increased read/write operations on the tasks table 
       Solution: Adding proper indexes, introducing pagination, and caching using Redis can be implemented.

    - Serverless API scaling
       High traffic on Vercel serverless functions
       Solution: Usage of Edge Functions for read-heavy endpoints or introducing a dedicated backend service can be considered.

    - Session & auth overhead
        Repeated auth checks per request.
        Solution: Optimize middleware, reduce unnecessary auth calls, and use caching where possible.

4. One design or technical decision you made that you know is not ideal, but accepted due to time constraints.
The assignment is pretty simple (only title, id, user_id, timestamps).
In a real production system:
    - Task completion status
    - Usage of tanstack query instead of custom hook
    - Validation schema (e.g., Zod)
    - Pagination
    - Better error boundaries
    - Activity logs

For this assignment, I focused on correctness and clarity over unmentioned requirements.

5. How would you modify the system if:
   - Firebase/Supabase is removed
      - use a custom backend
      - Implement authentication using JWT and move it to BE for security
      The current architecture already separates concerns, so this change would be manageable.


   - Role-based access is introduced
      - Add a role field to a profiles table
      - Enforce role checks in middleware and APIs
      - Update database policies to restrict actions based on role


   - Activity/audit logs are required
      - Create an activity_logs table with details like (user_id, action, metadata, timestamp)
      - Log important actions inside API routes
      - Optionally expose admin-only audit views