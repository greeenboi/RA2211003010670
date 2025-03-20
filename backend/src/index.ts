import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { rateLimiter } from 'hono-rate-limiter';
import { store } from './lib/limiter';
import { getRouterName, showRoutes } from 'hono/dev';
import { Bootstrap } from './utils';

const app = new Hono();

const allowedOrigins = ['http://localhost:3000', 'http://localhost:5173'];

app.use(
	cors({
		origin: origin => {
			if (!origin || allowedOrigins.includes(origin)) {
				return origin;
			}
			return ''; // Disallow other origins so its a empty string
		},
		allowMethods: ['POST', 'GET', 'OPTIONS', 'PUT', 'DELETE'],
		allowHeaders: ['Content-Type', 'Authorization'],
		credentials: true,
	}),
);

app.use(
	'*',
	rateLimiter({
		windowMs: 15 * 60 * 1000, // i think 15 minutes is enough
		limit: 100,
		standardHeaders: 'draft-6',
		keyGenerator: c =>
			c.req.header('x-forwarded-for') ||
			c.req.header('x-real-ip') ||
			'default-key',
		store: store,
	}),
);

Bootstrap(app);

getRouterName(app);
showRoutes(app, {
	verbose: true,
});

export default app;
