import type { Hono } from 'hono';
import appRouter from '../routes';

export async function Bootstrap(app: Hono) {
	app.route('/', appRouter);
}
