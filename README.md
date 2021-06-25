# How to use

## Run client
Go to `client` folder and to get started run:
```
yarn;
yarn start;
```
See the README for more commands.
The client address is http://localhost:3000

## Run service
Go to `gateway` folder and to get started run:
```
yarn installAll;
yarn dev;
```
See the README for more commands.
The GraphQL playground addresses for different services are:
- gateway: http://localhost:4000
- dataservice: http://localhost:4001
- userservice: http://localhost:4002
- reviewservice: http://localhost:4003



To test if backend is working properly run this query at http://localhost:4000

```
query {
  users {
    name
    id
    reviews {
      content
    }
  }
  posts {
    title
  }
  receipes {
    title
  }
}
```

You should get the following result:

```json
{
  "data": {
    "users": [
      {
        "name": "John Doe",
        "id": 1,
        "reviews": [
          {
            "content": "Elokuva III"
          }
        ]
      },
      {
        "name": "Jane Doe",
        "id": 2,
        "reviews": []
      },
      {
        "name": "James Doe",
        "id": 3,
        "reviews": [
          {
            "content": "Pasta carbonara"
          }
        ]
      },
      {
        "name": "Julia Doe",
        "id": 4,
        "reviews": []
      }
    ],
    "posts": [
      {
        "title": "Today I learned"
      },
      {
        "title": "What a lovely day"
      }
    ],
    "receipes": [
      {
        "title": "Testi"
      }
    ]
  }
}
```

