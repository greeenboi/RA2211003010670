import { Redis } from '@upstash/redis';
import { RedisStore } from '@hono-rate-limiter/redis';
import { CONFIG } from '../config';

export const redis = new Redis({
	url: CONFIG.upstash.UPSTASH_REDIS_REST_URL,
	token: CONFIG.upstash.UPSTASH_REDIS_REST_TOKEN,
});

export const store = new RedisStore({ client: redis });
