## Backend Setup

- cd api && npm install
- npx prisma migrate dev --name init
- npx prisma migrate deploy
- npm run dev

## Add .env

```
SECRET=your_secret_key
DATABASE_URL=mysql....
```

## Database user Setup(write thid code in graphql query server)

```
mutation Register($email: String!, $password: String!){
  register(email: $email, password: $password)
}

{
  "email": "test1@gmail.com",
  "password": "test1"
}
```

## Frontend Setup

- cd client && npm install
- npm start
