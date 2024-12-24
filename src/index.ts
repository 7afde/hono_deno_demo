import app from "./app.ts";

const port = 3000;
console.log(`Server running on http://localhost:${port}`);

Deno.serve({ port }, app.fetch);
