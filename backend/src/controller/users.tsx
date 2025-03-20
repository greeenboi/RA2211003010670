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

export async function handleGetTopUsers(c: Context) {
	try {
		const cacheKey = 'top_users';
		
		const cachedTopUsers = await redis.get(cacheKey);
		if (cachedTopUsers) {
			return c.json(JSON.parse(cachedTopUsers as string));
		}

		const authHeader = c.req.header('Authorization');
		const usersResponse = await fetch(`${CONFIG.api.url}/test/users`, {
			headers: {
				Authorization: authHeader || '',
			},
		});
		
		if (!usersResponse.ok) {
			return c.json({ error: `API responded with status: ${usersResponse.status}` });
		}
		
		const users = await usersResponse.json();
		
		const userPostCounts = [];
		for (const user of users) {
			const postsResponse = await fetch(
				`${CONFIG.api.url}/test/users/${user.id}/posts`,
				{
					headers: {
						Authorization: authHeader || '',
					},
				}
			);
			
			if (postsResponse.ok) {
				const posts = await postsResponse.json();
				userPostCounts.push({
					...user,
					postCount: posts.length
				});
			} else {
				userPostCounts.push({
					...user,
					postCount: 0
				});
			}
		}
		
		const topUsers = userPostCounts
			.sort((a, b) => b.postCount - a.postCount)
			.slice(0, 5);
		
		await redis.set(cacheKey, JSON.stringify(topUsers), { ex: 300 });
		
		return c.json(topUsers);
	} catch (error) {
		return c.json({ error: `Failed to fetch top users: ${error}` }, 500);
	}
}

export async function handleGetTopOrLatestPosts(c: Context) {
	try {
		const type = c.req.query('type');
		if (type !== 'latest' && type !== 'popular') {
			return c.json({ error: 'Invalid type parameter. Use "latest" or "popular".' }, 400);
		}
		
		const cacheKey = `posts_${type}`;
		
		const cachedPosts = await redis.get(cacheKey);
		if (cachedPosts) {
			return c.json(JSON.parse(cachedPosts as string));
		}

		const authHeader = c.req.header('Authorization');
		
		const allPostsResponse = await fetch(`${CONFIG.api.url}/test/posts`, {
			headers: {
				Authorization: authHeader || '',
			},
		});
		
		if (!allPostsResponse.ok) {
			return c.json({ error: `API responded with status: ${allPostsResponse.status}` });
		}
		
		// we have to use let so we can edit the array later
		let posts = await allPostsResponse.json();
		
		if (type === 'popular') {
			const postsWithCommentCount = [];
			
			for (const post of posts) {
				const commentsResponse = await fetch(
					`${CONFIG.api.url}/test/posts/${post.id}/comments`,
					{
						headers: {
							Authorization: authHeader || '',
						},
					}
				);
				
				if (commentsResponse.ok) {
					const comments = await commentsResponse.json();
					postsWithCommentCount.push({
						...post,
						commentCount: comments.length
					});
				} else {
					postsWithCommentCount.push({
						...post,
						commentCount: 0
					});
				}
			}
			
			postsWithCommentCount.sort((a, b) => b.commentCount - a.commentCount);
			
			const maxCommentCount = postsWithCommentCount.length > 0 ? postsWithCommentCount[0].commentCount : 0;
			posts = postsWithCommentCount.filter(post => post.commentCount === maxCommentCount);
		} else {
			// biome is peak for this
			posts.sort((a: { createdAt: string | number | Date; }, b: { createdAt: string | number | Date; }) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
			posts = posts.slice(0, 5);
		}
		
		await redis.set(cacheKey, JSON.stringify(posts), { ex: 300 });
		
		return c.json(posts);
	} catch (error) {
		return c.json({ error: `Failed to fetch ${c.req.query('type') || 'latest'} posts: ${error}` }, 500);
	}
}
