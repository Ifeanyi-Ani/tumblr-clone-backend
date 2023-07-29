## Overview

This repository contains the backend code for a web application built using
Node.js, Express, and Mongoose. The backend provides API endpoints to manage
User, Post, Comment, and Like functionalities.

## Prerequisites

Before running the backend, make sure you have the following installed on your
system:

- Node.js (https://nodejs.org)
- MongoDB (https://www.mongodb.com)

## Installation

1. Clone the repository to your local machine:

```
git clone https://github.com/Ifeanyi-Ani/blog-backend.git
cd blog-backend
```

2. Install the dependencies:

```
npm install
```

3. Set up the environment variables:

Create a `.env` file in the root directory and provide the required environment
variables. For example:

```
PORT=4000
DATABASE=mongodb://127.0.0.1:27017/tumblr-app
```

## Folder Structure

```
- blog-backend/
  - controllers/
    - authController.js
    - userController.js
    - postController.js
    - commentController.js
    - likeController.js
    - errController.js
  - models/
    - User.js
    - Post.js
    - Comment.js
  - routes/
    - auth.js
    - users.js
    - post.js
    - comments.js
    - likes.js
  - utils/
    - appErr.js
    - catchAsync.js
  - public/
    - img/
      - users/
      - posts/
  - app.js
  - server.js
```

- **controllers/**: Contains the route handlers for each API endpoint. The
  controllers interact with the models to perform CRUD operations.

- **models/**: Defines the Mongoose schemas for User, Post, Comment, and any
  other data models used in the application.

- **routes/**: Contains the route definitions for each API endpoint. These route
  files use the corresponding controller functions.

- **public/**: Contains image storage

- **utils/**: Handles the middleware for catching errors and more.

- **app.js**: Handles the main application logic, including setting up
  middleware and registering routes.

- **server.js**: Handles the server logic, such as starting the server and
  listening for incoming requests.

## Usage

To start the server, run the following command:

```
npm start
```

The server will start running on the specified port (default is 4000). You can
then use tools like Postman or frontend applications to interact with the API
endpoints.

## API Endpoints

The backend provides the following API endpoints:

- **User Routes** and **auth Routes**:

  - `GET /users`: Get all users
  - `GET /users/:id`: Get a specific user by ID
  - `POST /auth/signup`: Create a new user
  - `POST /auth/login`: login a user
  - `PATCH /users/:id`: Update a user
  - `DELETE /users/:id`: Delete a user

- **Post Routes**:

  - `GET /posts`: Get all posts
  - `GET /posts/:id`: Get a specific post by ID
  - `POST /posts`: Create a new post
  - `PATCH /posts/:id`: Update a post
  - `DELETE /posts/:id`: Delete a post

- **Comment Routes**:

  - `GET posts/:postId/comments`: Get all comments
  - `GET posts/:postId/comments/:commentId`: Get a specific comment by ID
  - `POST posts/:postId/comments`: Create a new comment
  - `PATCH posts/:postId/comments/:commentId`: Update a comment
  - `DELETE posts/:postId/comments/:commentId`: Delete a comment

- **Like Routes**:
  - `POST /likes/:postId`: Like a post
  - `DELETE /likes/:postId`: Unlike a post

## Known Issues (Work in Progress)

1 Token Cookie Not Stored Automatically: The token sent as a cookie is not being
automatically stored in the browser cookie. This issue is currently being
investigated, and a solution will be implemented soon.

2 Incomplete Logout Logic: The logout logic is not yet complete. While users can
log out, certain edge cases or cleanup processes may not be handled correctly.
This functionality will be enhanced in upcoming updates.

3 Incomplete Security Measures: Some security measures, such as input
validation, rate limiting, and Sanitizer, have not been fully implemented.
Security is a top priority, and these measures will be added to the application
to ensure it is robust and safe.

4 View Improvements: Currently, the responses from the API endpoints are basic
and lack a user-friendly interface. Creating a nicer view for the responses is
planned to improve the overall user experience.

## Contributing

Feel free to contribute to this project by opening issues or submitting pull
requests. Your contributions are appreciated!

## License

This project is licensed under the [ISC License](LICENSE).

---
