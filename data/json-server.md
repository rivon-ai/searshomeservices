A **JSON Server** usually means a tiny “fake REST API” that serves data from a `db.json` file. It’s popular for prototyping because you get endpoints like `GET /posts`, `POST /posts`, etc. with almost no backend code.

Below are two solid ways to use it with a Next.js app:

---

## 1) What JSON Server is (and what it gives you)

With a `db.json` like:

```json
{
  "posts": [{ "id": 1, "title": "Hello", "body": "World" }],
  "users": [{ "id": 1, "name": "Rivon" }]
}
```

JSON Server automatically exposes:

- `GET /posts`
- `GET /posts/1`
- `POST /posts`
- `PUT /posts/1`
- `PATCH /posts/1`
- `DELETE /posts/1`

Plus useful query features:

- Filter: `/posts?title=Hello`
- Full-text search: `/posts?q=hello`
- Pagination: `/posts?_page=1&_limit=10`
- Sort: `/posts?_sort=id&_order=desc`

---

## 2) Build a JSON Server (standalone) in 2 minutes

### Install and create files

```bash
npm init -y
npm i json-server
```

Create `db.json`:

```json
{
  "posts": [{ "id": 1, "title": "First post", "body": "..." }]
}
```

Add a script in `package.json`:

```json
{
  "scripts": {
    "json:server": "json-server --watch db.json --port 4000"
  }
}
```

Run it:

```bash
npm run json:server
```

Now your API is at:

- `http://localhost:4000/posts`

---

## 3) Use it from a Next.js app as “endpoints”

You have two common patterns:

### Pattern A: Next.js calls JSON Server directly (simple)

Your Next pages/components call `http://localhost:4000/...` with `fetch`.

**Example (App Router) – server component:**

```js
// app/posts/page.js
export default async function PostsPage() {
  const res = await fetch("http://localhost:4000/posts", { cache: "no-store" });
  const posts = await res.json();

  return (
    <ul>
      {posts.map((p) => (
        <li key={p.id}>{p.title}</li>
      ))}
    </ul>
  );
}
```

**Example – client component + create post:**

```js
"use client";

import { useState } from "react";

export default function CreatePost() {
  const [title, setTitle] = useState("");

  async function onSubmit(e) {
    e.preventDefault();
    await fetch("http://localhost:4000/posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, body: "from next" }),
    });
    setTitle("");
  }

  return (
    <form onSubmit={onSubmit}>
      <input value={title} onChange={(e) => setTitle(e.target.value)} />
      <button type="submit">Add</button>
    </form>
  );
}
```

**When to use:** local prototyping, quick demo.

**Watch-out:** if your Next app is server-rendering and your JSON server is on a different host/port, it’s fine server-side, but browser-side requests may need CORS. JSON Server generally handles this okay, but if you run into it, use Pattern B.

---

### Pattern B: Next.js exposes endpoints that proxy to JSON Server (more “realistic”)

You create Next API routes like `/api/posts` and internally forward to JSON Server. Then your frontend always calls **same-origin** `/api/...` (no CORS issues, easy to swap later for real backend).

**Example (App Router route handlers)**

`app/api/posts/route.js`

```js
export async function GET() {
  const res = await fetch("http://localhost:4000/posts", { cache: "no-store" });
  const data = await res.json();
  return Response.json(data);
}

export async function POST(req) {
  const body = await req.json();
  const res = await fetch("http://localhost:4000/posts", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const data = await res.json();
  return Response.json(data, { status: 201 });
}
```

Now your app calls:

- `GET /api/posts`
- `POST /api/posts`

**When to use:** best dev experience, easiest future migration.

---

## 4) Make it nice: env vars + concurrent dev

In Next, set:

`.env.local`

```bash
JSON_SERVER_URL=http://localhost:4000
```

Use it in route handlers:

```js
const BASE = process.env.JSON_SERVER_URL;

export async function GET() {
  const res = await fetch(`${BASE}/posts`, { cache: "no-store" });
  return Response.json(await res.json());
}
```

Run Next + JSON Server together:

```bash
npm i -D concurrently
```

`package.json`:

```json
{
  "scripts": {
    "dev": "concurrently \"next dev\" \"npm run json:server\"",
    "json:server": "json-server --watch db.json --port 4000"
  }
}
```

Now just:

```bash
npm run dev
```

---

## 5) Bonus: custom routes, auth-ish, relationships

JSON Server supports:

- custom routes via a `routes.json`
- middleware
- simple relationships by referencing ids (you can “expand” with `?_expand=` and `?_embed=` depending on structure)

But for anything beyond prototyping, you’ll quickly want:

- Next Route Handlers with a database (Prisma)
- or a hosted BaaS (Supabase, Firebase)
- or a real API (Express/Nest/etc.)

---

## Quick recommendation

If your goal is “use in Next as endpoints,” do **Pattern B (proxy through `/api/...`)** . It avoids CORS, keeps your frontend stable, and later you can replace JSON Server with a real backend without changing the UI calls.

If you tell me whether you’re using **Next App Router (app/)** or **Pages Router (pages/)** , I’ll tailor the exact folder paths and example files to match your project.
