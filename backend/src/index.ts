import { Hono } from 'hono'
import { cache } from 'hono/cache'
import { rateLimiter } from 'hono-rate-limiter'
import { store } from './lib/limiter'
import { getRouterName, showRoutes } from 'hono/dev';
import { Bootstrap } from './utils'



const app = new Hono()

app.use(
  '*',
  rateLimiter({
    windowMs: 15 * 60 * 1000, // i think 15 minutes is enough
    limit: 100,
    standardHeaders: 'draft-6',
    keyGenerator: (c) => c.req.header('x-forwarded-for') ||
		c.req.header('x-real-ip') ||
		'default-key',
    store: store,
  })
)

Bootstrap(app)

getRouterName(app);
showRoutes(app, {
	verbose: true,
});


export default app
