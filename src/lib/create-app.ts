import { OpenAPIHono } from "@hono/zod-openapi";
import { notFound, onError, serveEmojiFavicon } from "@stoker/middlewares";
import { pinoLogger } from "../middlewares/pino-logger.ts";
import type { PinoLogger } from "@hono-pino";

type AppBindings = {
  Variables: {
    logger: PinoLogger;
  };
};

export default function createApp() {
  const app = new OpenAPIHono<AppBindings>();
  app.use(serveEmojiFavicon("🔥"));
  app.use(pinoLogger());

  app.notFound(notFound);
  app.onError(onError);
  return app;
}
