import { Hono } from "hono";
import { handleGetPostComments, handleGetUserPosts, handleGetUsers } from "../controller/users";

const usersRouter = new Hono();

usersRouter.get("/users", async (c) => handleGetUsers(c));
usersRouter.get('/users/:userid/posts', async (c) => handleGetUserPosts(c));
usersRouter.get('/posts/:postid/comments', async (c) => handleGetPostComments(c));
  


export default usersRouter;