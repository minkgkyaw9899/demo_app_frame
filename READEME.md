# Demo Testing For FBP Functionality

Todo List 

- Create demo API
  - [x] Create login route
  - [x] Create register route
  - [x] Create create-post route
  - [x] Create get-posts route
  - [x] Create get-post by id route
  - [x] Create update post route
  - [x] Create delete post route
  - [ ] Encrypt and Decrypt all request and response
- Create demo mobile app
  - [x] From handling with react-hook-form with zod
  - [x] Fetching / mutation api data with react-query
    - Mutation
      - [x] Login user (auto save user token on success and navigate to home screen)
      - [x] Register user (same logic like login)
      - [ ] Create post (auto add new post to posts queries)
      - [ ] Update post (auto update post from posts queries)
      - [ ] Delete post (auto delete post from posts queries)
    - Query
      - [x] Fetch all posts with Infinite Queries (auto fetch next paginate posts on scroll end and fetch new post on refresh control/ user refresh screen)
  - [x] FlatList optimization with FlashList
  - [x] Integration Redux/toolkit state management
  - [ ] Add encrypt / decrypt on server and mobile
  - [ ] Add Push notification with firebase
  - [ ] Add map service

___

Installation and setup environment

- Must be `React native` developer
- Must have `Docker` (to run PostgresSQL database)

> If you don't have or not installed `Docker`, no problem at ACE office because we can share server on local network

Make sure your docker is running in background and open terminal

```bash
# first run server and db
git clone git@github.com:minkgkyaw9899/demo_app_frame.git
cd demo_app_frame/server
npm install
cp .env.example .env
docker compose up -d
npm run dev

# second run and build app on debug mod
cd mobile
npm install 
cp .env.example .env
# update API_URL *
npm start

# happy coding....
```

___

# End points

API_URL - api base url can depend on your server host address
> http://localhost:3000/api/v1

<br/>

## For Auth/User routes

<br/>

- login user

POST - `/users/login`
```json
{
  "email": "string@mail.com",
  "password": "string"
}
```

<br/>

- register user

POST - `/users/register`

```json
{
  "name": "string",
  "email": "string@mail.com",
  "password": "string"
}
```

<br/>

## For posts routes

<br/>

- get all posts

GET - `/posts`

> With pagination
> 
> GET - `/posts?pages=2`

<br/>

- get post by id

GET - `/posts/:id`

<br/>

- update post by id 

PATCH - `/posts/:id`

```json
{
  "title": "string",
  "body": "string"
}
```

<br/>

- delete post by id 

DELETE - `/posts/:id`

<br/>

___