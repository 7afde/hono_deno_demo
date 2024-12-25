import app from "./app.ts";
import env from "./env.ts";

const port = env.PORT || 3000;
console.log(`Server running on http://localhost:${port}`);

Deno.serve({ port }, app.fetch);
