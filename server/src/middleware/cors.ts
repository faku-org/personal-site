/**
 * /server/src/middleware/cors.ts
 * CORS configuration factory.
 * Restricts origin to the admin app (never wildcard in production).
 *
 * Dependencies: @elysiajs/cors
 */

import { cors } from '@elysiajs/cors'

export function createCorsMiddleware(origin: string | string[]) {
  return cors({
    origin,
    methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type'],
    credentials: true,
  })
}
