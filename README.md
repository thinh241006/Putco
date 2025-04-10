## Project structure modules

Project compose of 2 services:

1. Client (FrontEnd): [client folder](./client)
2. Server (BackEnd): [server folder](./server)

See the folder structure here:

```bash
/Users/quangnguyen/Documents/Putco/
├── client/                      # Frontend React application
│   ├── src/
│   │   ├── components/          # React components
│   │   ├── services/            # API service functions
│   │   ├── store/               # Redux store
│   ...
├── server/                      # Backend application
│   ├── app.js                   # Express app configuration
│   ├── index.js                 # Server entry point
│   ├── config/                  # Configuration files
│   ├── controllers/             # Route controllers
│   │   ├── admin/               # Admin-specific controllers
│   ├── middleware/              # Express middleware
│   ├── models/                  # Database models
│   ├── routes/                  # API routes
│   │   ├── admin/               # Admin-specific routes
│   ...
```

<hr />

## Project Features

**Putco for Customers:**
- Reviews of the Months: Attract more similar customers to businesses
- Crowd-sourcing hub for business: Create a big hub for local businesses / non target businesses
- Filter + Assortion: Suggest and show tailor experiences for person
- User reviews: Reviews are posted by freedom of speech with strict human moderation

**Putco for Business (Admin endpoints):** 
- Adding coupons for businesses: boost advertisements and collaboration for bot-supported reviews
- Adding new locations for businesses: increase appearances for business 
-> Activate this functionality by running a createAdmin script on backend side
-> Logging in as admin will lead to this business adminstration platform
  
<hr />

## Project Tech Stacks

- Google Map API: Fetch locations from the Google Cloud Platform
- Google Cloud Platform: Support monitoring user access and billing of Google Map API and Putco's services usage
- Cloudinary: Free image storage for reviews and custom locations
- Docker: Containerization & deployment tools
- MongoDB Atlas: No-SQL Database for frequent data access/changes for user reviews / coupons / custom locations
- ExpressJs: Interface designs for RESTful API endpoints to manage services
- ReactJs: Responsive and non-static visualizing user interface design
- NodeJs: Serverside scripting language for network routing

<hr />

## Future Enhancement:

- Docker → Containerize services + scalable service by service
- Kubernetes → Driving containers
- Nginx → Driving / Load balancing users
- Meta Graph API → social media integration for coupons / advertisement
- Fully functional social media + new locations adding
- Reintegrate the database coupons
- AI moderation + AI generative for coupon’s QR code and social media
→ Cheap, Scalable, Expandable, Easy to use

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

<hr />

## Local Installation

**Requirements**:

- NodeJs + ExpressJS + Vite
- React
- GoogleMap API
- TailwindCSS
- Cloudinary API
- MongoDB Atlas API

**Steps**:

- Clone project to local machine:

```bash
git clone https://github.com/qu-ngx/Putco.git
```

- Open your terminal and run the following commands:

```bash
cd Putco
```

- Before running add each .env file into Client Folder and Server Folder respectively
# .env file for client:
  
```bash
# Server Configuration
VITE_SERVER_PORT=5300
VITE_CLIENT_PORT=5173
VITE_CLIENT_PORT_ALT=5174

# Google Maps Configuration
VITE_GOOGLE_MAPS_API_KEY={YOUR GOOGLE MAP API KEY}
```

# .env for server
```bash
# Server Configuration
PORT=5300
CLIENT_PORT=5173
CLIENT_PORT_ALT=5174

# Database Configuration
MONGODB_URI={YOUR MONGODB_URI}

# Authentication Configuration
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRE=7d
COOKIE_EXPIRE=7

# Cloudinary Configuration
CLOUDINARY_CLOUD_NAME={YOUR CLOUDINARY NAME}
CLOUDINARY_API_KEY={YOUR CLOUDINARY API KEY}
CLOUDINARY_API_SECRET={YOUR MAP API SECRET}

# Google Maps API Configuration
GOOGLE_MAPS_API_KEY={YOUR GOOGLE MAP API KEY}
```

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
