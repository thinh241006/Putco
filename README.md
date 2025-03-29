## Project structure modules

Project compose of 2 services:

1. Client (FrontEnd): [client folder](./client)
2. Server (BackEnd): [server folder](./server)

<hr />

## Project structure modules

Guideline for contributions:

1. Do not push directly to the repo
2. Instead use git checkout command:

```bash
git checkout <your-name>
```

(Replace your name with quang/thinh/chi)

3. Commit and push to your branch only (You should see your name next to current branch in terminal)
4. Create a pull request to the main branch and wait for approval, done!

## Local Installation

**Requirements**:

- NodeJs
- React

**Steps**:

- Clone project to local machine:

```bash
git clone https://github.com/qu-ngx/Putify.git
```

- Open your terminal and run the following commands:

```bash
cd Putify
```

- Before running add each .env file into Client Folder and Server Folder respectively

- Run the following commands to install all dependencies (Make sure your machine has Node Package Manager installed):

```bash
cd server && npm install && cd ../client && npm install
```

- Close the old terminal first
- Open a new terminal and run the following commands to run the frontend:

```bash
cd client/
npm run dev
```

- Open a new terminal and run the following commands to run the frontend:

```bash
cd server/
npm run dev
```

**Note**: If you encounter some problems with installation, you should:

Check version of dependencies for the server:

- Express 4.19.2, Mongoose 8.5.3, and other recent dependencies
- Node.js version 14 or higher

For the client:

- Vite 5.4.1 (Node.js version 18.0.0 or higher)
- React 18.3.1

Therefore, to ensure full compatibility with both the frontend and backend, you should use:
Node.js version 18.0.0 or higher
