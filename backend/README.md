# Routes information

- Get users API: `http://20.244.56.144/test/users`
response 
```json
{
    "users": [
        {
           "1": "John Doe",
           "10": "Jane Doe"
        }
    ]
}
```

- Get Posts API: `http://20.244.56.144/test/users/:userid/posts`
response for user 1
```json
{
    "posts": [
        {
            "id": 246,
            "userid": 1,
            "content": "post about ant"
        }
    ]
}
```

- Get Comments API: `http://20.244.56.144/test/posts/:postid/comments`
response for posts 150
```json
{
    "comments": [
        {
            "id": 3893,
            "postid": 150,
            "content": "Old comment"
        }
    ]
}
```

