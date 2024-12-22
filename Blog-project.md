# Blog Project

## Overview

The Blog Project is designed to serve as the backend for a comprehensive blogging platform. Users can create, update, and delete their blogs. It includes role-based access control, with two distinct roles: Admin and User. Admins have elevated privileges, such as managing users and their blogs, while regular users can manage their own content. The platform features secure authentication and a public API for browsing blogs, complete with search, sort, and filter functionalities.

## Technologies Used

- **TypeScript**: For type-safe coding and improved developer experience.
- **Node.js**: As the runtime for server-side JavaScript.
- **Express.js**: For building the API routes and handling requests.
- **MongoDB**: As the database for storing user and blog data.
- **Mongoose**: For object data modeling and schema definition.

## Features

### User Roles

- **Admin**:
  - Manually created in the database.
  - Can delete any blog.
  - Can block users by setting the `isBlocked` property.
  - Cannot update blog content.
- **User**:
  - Can register and log in.
  - Can create, update, and delete their own blogs.
  - Cannot perform admin-specific actions.

### Authentication & Authorization

- **Authentication**:
  - JWT-based secure login system.
  - Users must be authenticated to perform write operations.
- **Authorization**:
  - Differentiates between Admin and User roles.
  - Ensures restricted access based on roles.

### Blog API

- Public API to view blogs with the following functionalities:
  - **Search**: Blogs can be searched by title or content.
  - **Sort**: Blogs can be sorted by fields such as `createdAt`.
  - **Filter**: Blogs can be filtered by specific author IDs or other criteria.

## Models

### User Model

- `name`: Full name of the user.
- `email`: Email address, used for login and communication.
- `password`: Securely stored password.
- `role`: Specifies whether the user is an `admin` or a `user`. Defaults to `user`.
- `isBlocked`: Indicates if the user is blocked. Defaults to `false`.
- `createdAt`: Timestamp of user creation.
- `updatedAt`: Timestamp of the last update.

### Blog Model

- `title`: Title of the blog post.
- `content`: Main content of the blog.
- `author`: References the User model to associate a blog with its author.
- `isPublished`: Indicates if the blog is published. Defaults to `true`.
- `createdAt`: Timestamp of blog creation.
- `updatedAt`: Timestamp of the last update.

## API Endpoints

### Authentication

- **Register User**: `POST /api/auth/register`
  - Allows new users to register by providing name, email, and password.
- **Login User**: `POST /api/auth/login`
  - Authenticates users and returns a JWT token for access.

### Blog Management

- **Create Blog**: `POST /api/blogs`
  - Authenticated users can create a blog.
- **Update Blog**: `PATCH /api/blogs/:id`
  - Authenticated users can update their blogs.
- **Delete Blog**: `DELETE /api/blogs/:id`
  - Authenticated users can delete their blogs.
- **Get Blogs**: `GET /api/blogs`
  - Public endpoint to fetch blogs with options for search, sort, and filter.

### Admin Actions

- **Block User**: `PATCH /api/admin/users/:userId/block`
  - Admins can block users.
- **Delete Blog**: `DELETE /api/admin/blogs/:id`
  - Admins can delete any blog.

## Installation

1. Clone the repository.
2. Run `npm install` to install dependencies.
3. Set up environment variables for database connection and JWT secret.
4. Start the server with `npm run dev`.

## Usage

1. Use the `/api/auth/register` endpoint to create a user.
2. Log in with `/api/auth/login` to obtain a JWT token.
3. Use the token to access secured endpoints, such as creating blogs or performing admin actions.

## Future Enhancements

- Add pagination to the blog listing API.
- Implement image uploads for blogs.
- Introduce categories and tags for better organization.
- Enhance security with rate limiting and advanced input validation.

## License

This project is licensed under the MIT License.
