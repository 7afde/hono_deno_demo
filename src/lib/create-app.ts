import { OpenAPIHono } from "@hono/zod-openapi";
import { notFound, onError, serveEmojiFavicon } from "@stoker/middlewares";
import { pinoLogger } from "../middlewares/pino-logger.ts";
import { AppBindings } from "./types.ts";

export default function createApp() {
  const app = new OpenAPIHono<AppBindings>({
    strict: false,
  });
  app.use(serveEmojiFavicon("🔥"));
  app.use(pinoLogger());

  app.notFound(notFound);
  app.onError(onError);
  return app;
}
