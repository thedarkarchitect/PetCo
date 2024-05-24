# PetCo App Backend

This is the backend for a Pet service management application bult using Node.js and Express.js. It provides RESTful APIs for every service including blog, products store, scheduling service for; grooming, clinc, training services.

### API Link: -> <https://petco.onrender.com/api/v1/${addpath to the api data}> 

## Features

- CRUD operations for managing pets
- User authentication and authorization
- Posting and commenting functionality
- Role-based access control
- Secure password hashing
- API documentation using postman
  
## Technologies Used

- Node.js
- Express.js
- Prisma (ORM)
- PostgeSQL (Database)
- JSON Web Tokens (JWT) for authentication
- Postman for API documentation
  
## Getting Started

### Prerequisities

- Node.js installed on your machine version 18 and above.
- PostgreSQL database server running locally or accessible remotely

### Installation

1. Clone the repository:

```
    git clone https://github.com/thedarkarchitect/PetCo.git  
    cd  backend
```

2. Install dependencies:

   ```npm install```

3. Set up environment variables: Create a `.env` ile in the root directory and provide the following variables:

```
    PORT=3001
    DATABASE_URL=postgresql://username:password@localhost:5432/PetCo?schema=public
    JWT_SECRET="use a hex secret key for better security"
```

4. Run database migrations:

   ```npx prisma migrate dev```

5. Start the server:

   ```npm start```

   The server will start running on <http://localhost:3001> by default.

## API Documentation

API documentation is available using postman using the url below

```-------------```

## Contributing

Contributions are welcome! if you find any bugs or have suggestions  for improvements, please open an issue or submit a pull request.
