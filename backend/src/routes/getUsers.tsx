import { Hono } from 'hono';
import {
	handleGetPostComments,
	handleGetTopOrLatestPosts,
	handleGetTopUsers,
	handleGetUserPosts,
	handleGetUsers,
} from '../controller/users';

const usersRouter = new Hono();

usersRouter.get('/users/all', async c => handleGetUsers(c));
usersRouter.get('/users/:userid/posts', async c => handleGetUserPosts(c));
usersRouter.get('/posts/:postid/comments', async c => handleGetPostComments(c));

usersRouter.get('/users', async c => handleGetTopUsers(c));
usersRouter.get('/posts', async c => handleGetTopOrLatestPosts(c));


export default usersRouter;
