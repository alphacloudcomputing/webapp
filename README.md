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

# Steps to Add an SSL Certificate to a Domain
1. Purchase or Obtain an SSL Certificate: You can purchase an SSL certificate from a trusted Certificate Authority (CA) or obtain a free one from services like Let's Encrypt.
2. Generate a Certificate Signing Request (CSR): On your server, generate a CSR. This will be used by the CA to create your SSL certificate. The CSR contains information like the domain name, organization name, locality, country, etc.
3. Submit the CSR to a Certificate Authority: Provide your CSR to the CA. They will validate your domain and organization details.
4. Verify Domain Ownership: The CA will require you to prove ownership of the domain. This is usually done via email verification or by uploading a specific file to your website.

# Steps to Upload an SSL Certificate to AWS using AWS CLI
1. Open your terminal or command prompt.
2. Navigate to the directory where your SSL certificate files are located.
3. Run the AWS CLI command to upload the certificate.
- The command format is as follows:
```bash
aws iam upload-server-certificate --server-certificate-name your_certificate_name --certificate-body file://your_certificate.crt --private-key file://your_private_key.key --certificate-chain file://your_certificate_chain.crt --path /cloudfront/your_path/
```
- Replace your_certificate_name with a name for your SSL certificate.
- Replace your_certificate.crt, your_private_key.key, and your_certificate_chain.crt with your certificate files' paths.
- The --path parameter is optional and can be used to specify a custom path for the certificate in IAM.
4. Check for successful upload.
5. After running the command, you should receive a JSON response with details of the uploaded certificate. Ensure there are no errors in the response.
6. Use the uploaded SSL certificate in your AWS services.
For example, in an Elastic Load Balancer, you can now select the uploaded SSL certificate by its name.
For Amazon CloudFront, you can use the certificate for custom SSL.
7. Verify the SSL setup.
After configuring your AWS service (like ELB or CloudFront) to use the new SSL certificate, ensure that it's working correctly by accessing your domain via HTTPS.