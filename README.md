# Assignments Management API

The Assignments Management API is a robust backend service designed for educational platforms that require a system to create, manage, and track assignments for their users. It offers authenticated operations, ensuring that sensitive actions are only accessible by authorized personnel. This system is perfect for integrating into your educational tech stack.

Additionally, this project automates the process of creating an Amazon Machine Image (AMI) using GitHub Actions. Once all checks pass successfully, an AMI is generated, making deployment in AWS environments more streamlined.

# Features

- CRUD Operations: Easily manage the lifecycle of assignments.
- Authentication: Secure methods ensure that only authorized personnel can make changes.
- Health Checks: Public endpoints are available for health checks, ensuring system reliability and uptime.
- Automated AMI Creation: GitHub Actions automatically generates an AMI after all checks pass.
# Prerequisites

Before you begin, ensure you have met the following requirements:

- You have installed the latest version of Node.js
- You have a Windows/Linux/Mac machine.
- You have read the API documentation.
- Installing Assignments Management API

To install the Assignments Management API, follow these steps:

#### Linux and macOS:
```bash
git clone https://github.com/your-repo/assignments-management-api.git
cd assignments-management-api
npm install
```
#### Windows:

```bash
git clone https://github.com/your-repo/assignments-management-api.git
cd assignments-management-api
npm install
```

# Using Assignments Management API

#### To use Assignments Management API, follow these steps:

Create a .env file in the root directory of the project, and add the following lines, replacing the values with your database credentials and preferred port:

```env
DB_HOST=your_database_host
DB_USER=your_database_user
DB_PASS=your_database_password
DB_NAME=your_database_name
PORT=your_preferred_port
```

#### Run the application
```bash
npm start
```

The server will start, and the application will connect to the database. You can now access the API at http://localhost:{PORT} (replace {PORT} with your chosen port number).

# GitHub Actions and AMI Creation

This project utilizes GitHub Actions to automate the CI/CD pipeline. When you make a pull request or push to the main branch, the system runs tests and checks. Once all checks have been passed successfully, GitHub Actions will generate an Amazon Machine Image (AMI) for easy deployment on AWS infrastructure.

# API Endpoints

You can begin using the API endpoints as described in the [API documentation](https://app.swaggerhub.com/apis-docs/csye6225-webapp/cloud-native-webapp/fall2023-a3#/Assignment). Here are a few to get you started:

- GET /v1/assignments
- POST /v1/assignments
- GET /v1/assignments/{id}
- DELETE /v1/assignments/{id}
- PUT /v1/assignments/{id}
- GET /healthz
- Contributing to Assignments Management API

# To contribute to Assignments Management API, follow these steps:

1. Fork this repository.
```
Create a branch: git checkout -b <branch_name>.
```
2. Make your changes and commit them:
``` 
git commit -m '<commit_message>' 
```
3. Push to the original branch: 
```
git push origin <project_name>/<location>
```

4. Create the pull request. Alternatively, see the GitHub documentation on creating a pull request.

# Contact

If you want to contact the maintainers, you can reach out at hirey.m@northeastern.com.