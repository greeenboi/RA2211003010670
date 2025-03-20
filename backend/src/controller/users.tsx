import type { Context } from 'hono';
import { redis } from '../lib/limiter';
import { CONFIG } from '../config';

export async function handleGetUsers(c: Context) {
	try {
		const cachedUsers = await redis.get('users');
		if (cachedUsers) {
			return c.json(JSON.parse(cachedUsers as string));
		}

		const authHeader = c.req.header('Authorization');
		const response = await fetch(`${CONFIG.api.url}/test/users`, {
			headers: {
				Authorization: authHeader || '',
			},
			});
		
		if (!response.ok) {
			return c.json({ error: `API responded with status: ${response.status}` });
		}
		
		const data = await response.json();
		
		if (!data) {
			return c.json({ error: 'Received null or invalid data from API' }, 500);
		}

		//  5 min expiry should be big enough
		await redis.set('users', JSON.stringify(data), { ex: 300 });

		return c.json(data);
	} catch (error) {
		return c.json({ error: `Failed to fetch users: ${error}`}, 500);
	}
}

export async function handleGetUserPosts(c: Context) {
	try {
		const userId = c.req.param('userid');
		const cacheKey = `posts:${userId}`;

		const cachedPosts = await redis.get(cacheKey);
		if (cachedPosts) {
			return c.json(JSON.parse(cachedPosts as string));
		}

		const authHeader = c.req.header('Authorization');
		const response = await fetch(
			`${CONFIG.api.url}/test/users/${userId}/posts`,
			{
				headers: {
					Authorization: authHeader || '',
				},
			}
			);
		
		if (!response.ok) {
			return c.json({ error: `API responded with status: ${response.status}` });
		}
		
		const data = await response.json();
		
		if (!data) {
			return c.json({ error: 'Received null or invalid data from API' }, 500);
		}

		await redis.set(cacheKey, JSON.stringify(data), { ex: 300 });

		return c.json(data);
	} catch (error) {
		return c.json({ error: `Failed to fetch posts: ${error}` }, 500);
	}
}

export async function handleGetPostComments(c: Context) {
	try {
		const postId = c.req.param('postid');
		const cacheKey = `comments:${postId}`;

		// Check Redis cache first
		const cachedComments = await redis.get(cacheKey);
		if (cachedComments) {
			return c.json(JSON.parse(cachedComments as string));
		}

		const authHeader = c.req.header('Authorization');
		const response = await fetch(
			`${CONFIG.api.url}/test/posts/${postId}/comments`,
			{
				headers: {
					Authorization: authHeader || '',
				},
				});
		
		if (!response.ok) {
			return c.json({ error: `API responded with status: ${response.status}` });
		}
		
		const data = await response.json();
		
		if (!data) {
			return c.json({ error: 'Received null or invalid data from API' }, 500);
		}

		await redis.set(cacheKey, JSON.stringify(data), { ex: 300 });

		return c.json(data);
	} catch (error) {
		return c.json({ error: `Failed to fetch comments: ${error}` }, 500);
	}
}
