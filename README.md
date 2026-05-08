# Meetra Platform - Backend

The robust backend engine for Meetra, a high-performance video conferencing platform. Built with Node.js, Express, and Socket.io to provide low-latency real-time communication, room management, and secure authentication.

## 🚀 Features

- **Real-time Communication**: Powered by Socket.io for signaling and instant messaging.
- **Meeting Management**: Create, join, and manage private/public rooms.
- **Waiting Room Logic**: Secure entry control for hosts to admit or deny participants.
- **Role-based Access**: granular permissions for Hosts, Co-hosts, and Participants.
- **Security**: JWT-based authentication and secure password hashing.
- **Scalable Architecture**: Organized controllers, models, and middleware.
- **Validation**: Strict input validation using Joi/express-validator.

## 🛠 Tech Stack

- **Runtime**: [Node.js](https://nodejs.org/)
- **Framework**: [Express.js](https://expressjs.com/)
- **Database**: [MongoDB](https://www.mongodb.com/) with [Mongoose](https://mongoosejs.com/)
- **Real-time**: [Socket.io](https://socket.io/)
- **Authentication**: [JWT (JSON Web Tokens)](https://jwt.io/)
- **Security**: [Bcrypt.js](https://github.com/kelektiv/node.bcrypt.js)

## 📁 Project Structure

```text
meet_platform_backend/
├── config/             # Database and environment configurations
├── controllers/        # Business logic for routes
├── middleware/         # Custom Express middleware (Auth, Error, Rate Limit)
├── models/             # Mongoose schemas
├── routes/             # API endpoint definitions
├── socket/             # Socket.io event handlers
├── utils/              # Helper functions
└── validators/         # Request validation logic
```

## ⚙️ Getting Started

### Prerequisites

- Node.js (v16+)
- MongoDB (Local or Atlas)

### Installation

1. Clone the repository and navigate to the backend folder:
   ```bash
   cd meet_platform_backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file based on `.env.example`:
   ```env
   PORT=5005
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_super_secret_key
   NODE_ENV=development
   ```

4. Start the server:
   ```bash
   # Development mode
   npm run dev

   # Production mode
   npm start
   ```

## 📡 Socket.io Events

| Event | Direction | Description |
| :--- | :--- | :--- |
| `join-room` | Client -> Server | Participant attempts to join a specific room. |
| `user-joined` | Server -> Client | Notifies room members of a new participant. |
| `chat-message` | Client <-> Server | Sends/Receives real-time messages. |
| `admit-user` | Host -> Server | Host allows a user from the waiting room. |
| `start-sharing` | Client -> Server | Initiates WebRTC screen sharing signaling. |

## 🛡 Security

- **Rate Limiting**: Protected against Brute Force attacks.
- **CORS Configuration**: Restricted to trusted origins.
- **Input Sanitization**: Protection against NoSQL injection.

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.
