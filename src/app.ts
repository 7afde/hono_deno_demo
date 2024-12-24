import { OpenAPIHono } from "@hono/zod-openapi";
import { notFound, onError } from "@stoker/middlewares";
import { pinoLogger } from "./middlewares/pino-logger.ts";
import type { PinoLogger } from "@hono-pino";

type AppBindings = {
  Variables: {
    logger: PinoLogger;
  };
};

const app = new OpenAPIHono<AppBindings>();
app.use(pinoLogger());

app.get("/", (c) => {
  return c.text("Hello heheh!");
});

app.get("/error", (c) => {
  throw new Error("This is an error");
});

app.notFound(notFound);
app.onError(onError);

export default app;
