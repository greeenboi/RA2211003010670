import { Hono } from 'hono';
import usersRouter from './getUsers';

const router = new Hono();

router.get('/', c => {
	return c.text('Hello Hono!');
});

router.get('/health', c => {
	return c.json({ status: 'ok' });
});

// routes are mapped internally

router.route('/', usersRouter);

export default router;
