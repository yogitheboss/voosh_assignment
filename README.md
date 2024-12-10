# **Voosh Music**

This repository is a backend application developed for the Voosh backend developer assignment. The project manages entities such as artists, albums, tracks, and user favorites in a music streaming service.

## **Project Structure**

The project is organized as follows:

```
├── app
│   ├── auth       # Authentication-related logic
│   ├── user       # User-specific logic
│   ├── artist     # Artist-specific logic
│   ├── album      # Album-specific logic
│   ├── favorite   # Favorites-specific logic
│   ├── track      # Track-specific logic
│       
├── config             # Contains configuration for connecting to the database and other services
├── helpers            # Utility functions frequently used across the project
├── middlewares        # Middleware functions such as authentication and request validation
├── models             # Mongoose schemas for user, artist, album, favorite, and track
├── .gitignore         # Excludes sensitive or unnecessary files from version control
├── index.js           # Main entry file to start the application
├── package.json       # Configuration of the project and required packages
```

---

## **Features**

- **User Management**: Authentication and user-related functionalities.
- **Artist Management**: CRUD operations for artists with filters for Grammy wins and visibility.
- **Album Management**: Albums associated with multiple artists.
- **Track Management**: Tracks linked to albums and artists.
- **Favorites**: Users can mark artists, albums, or tracks as favorites.

---

## **Getting Started**

### **Prerequisites**

- **Node.js** (v14 or above)
- **MongoDB** (Ensure MongoDB is running locally or remotely)
- A package manager like **npm** or **yarn**

---

### **Installation**

1. **Clone the repository**:
   ```bash
   git clone https://github.com/yogitheboss/voosh_assignment.git
   cd voosh_assignment
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up environment variables**:
   Create a \`.env\` file in the root of the project and add the following variables:
 ```env
   PORT=3000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
 ```

4. **Run the application**:
   ```bash
   npm start
   ```

   The server will start on the port defined in the \`.env\` file (default is \`3000\`).

---

## **API Endpoints**

### **Authentication**
| Method | Endpoint       | Description              |
|--------|----------------|--------------------------|
| POST   | \`/api/v1/login\`  | User login               |
| POST   | \`/api/v1/signup\` | User registration        |

### **Artists**
| Method | Endpoint         | Description                      |
|--------|------------------|----------------------------------|
| GET    | \`/api/v1/artists\`       | Retrieve all artists             |
| GET    | \`/api/v1/artists/:id\`       | Retrieve all artists             |
| POST   | \`/api/v1/artists/add-artist\`       | Create a new artist              |
| PUT    | \`/api/v1/artists/:id\`   | Update an artist's information   |
| DELETE | \`/api/v1/artists/:id\`   | Delete an artist                 |

### **Albums**
| Method | Endpoint         | Description                      |
|--------|------------------|----------------------------------|
| GET    | \`/albums\`        | Retrieve all albums              |
| POST   | \`/albums\`        | Create a new album               |
| PUT    | \`/albums/:id\`    | Update an album's information    |
| DELETE | \`/albums/:id\`    | Delete an album                  |

### **Tracks**
| Method | Endpoint         | Description                      |
|--------|------------------|----------------------------------|
| GET    | \`/tracks\`        | Retrieve all tracks              |
| POST   | \`/tracks\`        | Create a new track               |
| PUT    | \`/tracks/:id\`    | Update a track's information     |
| DELETE | \`/tracks/:id\`    | Delete a track                   |

### **Favorites**
| Method | Endpoint          | Description                           |
|--------|-------------------|---------------------------------------|
| GET    | \`/favorites\`      | Retrieve all user favorites  based on category         |
| POST   | \`/favorites\`      | Add an item (artist, album, track) to favorites |
| DELETE | \`/favorites/:id\`  | Remove an item from favorites         |

---

## **Development**

### **Scripts**
- **Start the application**:
  ```bash
  npm start
  ```
- **Run in development mode**:
  ```bash
  npm run dev
  ```

---

## **Folder Descriptions**

### **app**
- Contains the logic for routes and controllers, split into modules for each entity (user, artist, album, favorite, track).

### **config**
- Holds the configuration for connecting to the database and other backend services.

### **helpers**
- Contains reusable utility functions used throughout the project.

### **middlewares**
- Includes middleware for authentication and request validation to protect sensitive endpoints.

### **models**
- Defines Mongoose schemas for database collections such as users, artists, albums, tracks, and favorites.

---

## **.gitignore**
Ensures sensitive and unnecessary files (e.g., \`node_modules\`, \`.env\`) are excluded from the repository.

---

## **Contributing**

Feel free to contribute by submitting issues or pull requests. Please ensure all new features are covered with appropriate tests.

---

## **License**

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

## **Contact**

For any questions or feedback, feel free to reach out:

- **Email**: yograjrjpt123@gmail.com
- **GitHub**: [yogitheboss](https://github.com/yogitheboss)
