# My Submission

Below is a simple an quick guide to the submission of the project.

### Backend

#### Techstack Used

- hono
- redis (upstash)
- bun runtime
- openapi / swagger (not implemented due to time constraints)

It has been configured with logging, prettyjson, cors, ratelimiting and cache on redis.

routes are:
ALL  /*
       cors2
       [middleware]
       logger2
       prettyJSON2
GET  /
       [handler]
GET  /health
       [handler]
GET  /users/all
       [handler]
GET  /users/:userid/posts
       [handler]
GET  /posts/:postid/comments
       [handler]
GET  /users
       [handler]
GET  /posts
       [handler]

Now, to run the backend, you can use the following commands:

```bash
cd backend
bun install
bun dev
```

Make sure to change the config file if you don't have access to the .env vars/


### Frontend
