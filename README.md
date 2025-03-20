# My Submission

Below is a simple an quick guide to the submission of the project.

### Backend

#### Techstack Used

- hono
- redis (upstash)
- bun runtime
- openapi / swagger (not implemented due to time constraints)

It has been configured with logging, prettyjson, cors, ratelimiting and cache on redis.

port is `5173`
routes are:
```
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
```
Now, to run the backend, you can use the following commands:

```bash
cd backend
bun install
bun dev
```

or if ur too cool for that, ive taken the liberty to dockerize this api

```bash
cd backend
docker compose-up --build -d
```

Make sure to change the config file if you don't have access to the .env vars/
---
![image](https://github.com/user-attachments/assets/080d6033-3867-4fbc-a291-ec6a8ba72cfe)
_rip backend_


### Frontend

Here is a simple guide to run the frontend:

```bash
cd frontend
bun install
bun dev
```

the frontend is a bit janky, but just is a simple feed ui on /, shows trending posts and users
then separate pages for top users and trending posts.

The main issue here is that i am using sample data in the same format prescribed in the requirements, since the backend calls keep giving me errors, i implemented sample data as fallback to the backend api calls.

so lets go with that for now.
---
![image](https://github.com/user-attachments/assets/cea41cb3-4007-4577-9ff1-4bc4a5347cff)
![image](https://github.com/user-attachments/assets/76b35ac9-576b-4967-9420-c97d3e036cba)
![image](https://github.com/user-attachments/assets/4ed286fb-86d0-4176-b800-e876cb263dd5)
![image](https://github.com/user-attachments/assets/e858f122-bfea-4e28-a704-3fb4e5e27ca5)



