import { z } from "@hono/zod-openapi";

const EnvSchema = z.object({
  DENO_ENV: z.string().default("development"),
  PORT: z.coerce.number().default(9999),
  LOG_LEVEL: z
    .enum(["fatal", "error", "warn", "info", "debug", "trace", "silent"])
    .default("info"),
  // DATABASE_URL: z.string().url(),
  // DATABASE_AUTH_TOKEN: z.string().optional(),
});
// .superRefine((input, ctx) => {
//   if (input.DENO_ENV === "production" && !input.DATABASE_AUTH_TOKEN) {
//     ctx.addIssue({
//       code: z.ZodIssueCode.invalid_type,
//       expected: "string",
//       received: "undefined",
//       path: ["DATABASE_AUTH_TOKEN"],
//       message: "Must be set when DENO_ENV is 'production'",
//     });
//   }
// });

export type env = z.infer<typeof EnvSchema>;

const { data: env, error } = EnvSchema.safeParse(Deno.env);

if (error) {
  console.error("❌ Invalid env:");
  console.error(JSON.stringify(error.flatten().fieldErrors, null, 2));
  Deno.exit(1);
}

export default env!;
