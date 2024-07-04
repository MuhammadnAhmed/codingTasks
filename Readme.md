# JWT Authentication with Express

This project demonstrates a simple implementation of JSON Web Token (JWT) authentication using Node.js and Express.

## Getting Started

These instructions will help you set up and run the project on your local machine.

### Prerequisites

Make sure you have the following installed:

- Node.js
- npm (Node package manager)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/your-repo-name.git
   cd your-repo-name
   ```

2. Install the dependencies:

   ```bash
   npm install
   ```

### Running the Server

1. Start the server:

   ```bash
   node index.js
   ```

   Alternatively, you can use `nodemon` for automatic restarts:

   ```bash
   npx nodemon index.js
   ```

2. The server will run on `http://localhost:8000`.

## Endpoints

### POST /login

This endpoint authenticates the user and returns a JWT token.

- **URL:** `/login`
- **Method:** `POST`
- **Request Body:**
  ```json
  {
    "username": "zama",
    "password": "abcdef"
  }
  ```

## Response

- **200 OK** with a JSON object containing the token if credentials are valid.
- **403 Forbidden** with an error message if credentials are invalid.

### GET /resource

This endpoint checks the provided JWT token and returns a message with the username if the token is valid.

- **URL:** `/resource`
- **Method:** `GET`
- **Headers:**
  - `Authorization: Bearer <token>`
- **Response:**
  - **200 OK** with a message containing the username.
  - **401 Unauthorized** with an error message if the token is invalid.

### GET /admin_resource

This endpoint checks the provided JWT token and returns a success message if the token is valid and the user is an admin.

- **URL:** `/admin_resource`
- **Method:** `GET`
- **Headers:**
  - `Authorization: Bearer <token>`
- **Response:**
  - **200 OK** with a success message if the user is an admin.
  - **403 Forbidden** with an error message if the user is not an admin.
  - **401 Unauthorized** if the token is invalid.

## Contributing

If you would like to contribute, please fork the repository and use a feature branch. Pull requests are warmly welcome.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
