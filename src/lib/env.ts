/**
 * Configuration for type-safe environment variables.
 * Imported through src/app/page.tsx
 * @see https://x.com/mattpocockuk/status/1760991147793449396
 */
import { z } from 'zod'

const envVariables = z.object({
  AUTH_GITHUB_ID: z.string(),
  AUTH_GITHUB_SECRET: z.string(),
  AUTH_GOOGLE_ID: z.string(),
  AUTH_GOOGLE_SECRET: z.string(),
  CLOUDINARY_API_SECRET: z.string(),
  NEXT_PUBLIC_CLOUDINARY_API_KEY: z.string(),
  NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME: z.string(),
  NEXT_PUBLIC_GOOGLE_MAPS_API_KEY: z.string(),
  NEXT_PUBLIC_SHOW_LOGGER: z.enum(['true', 'false']).optional(),
  NEXTAUTH_SECRET: z.string(),
  NEXTAUTH_URL: z.string().url(),
  NODE_ENV: z
    .enum(['development', 'test', 'production'])
    .default('development'),
})

envVariables.parse(process.env)

declare global {
  // eslint-disable-next-line ts/no-namespace
  namespace NodeJS {
    interface ProcessEnv extends z.infer<typeof envVariables> {}
  }
}
