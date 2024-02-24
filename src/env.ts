// import { z } from "zod";

// const envVariables = z.object({
//   DATABASE_URL: z.string(),
//   CLOUDFLARE_ENDPOINT: z.string().url(),
//   CLOUDFLARE_ACCESS_KEY_ID: z.string(),
//   CLOUDFLARE_SECRET_ACCESS_KEY: z.string(),
// });

// declare global {
//   namespace NodeJS {
//     interface ProcessEnv extends z.infer<typeof envVariables> {}
//   }
// }

// export const env = envVariables.parse(process.env);
