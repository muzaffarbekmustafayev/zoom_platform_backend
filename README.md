# Zoom Clone - Backend

This is the backend server for the Zoom Clone application.

## 🛠 Tech Stack
- **Node.js** & **Express**
- **MongoDB** with **Mongoose**
- **Socket.io** for real-time communication
- **JWT** for authentication

## 🚀 Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Configure environment variables in `.env`:
   ```env
   PORT=5000
   MONGO_URI=your_mongodb_uri
   JWT_SECRET=your_jwt_secret
   ```

3. Run the server:
   ```bash
   npm start
   ```

## 📡 Socket Events Summary
- `join-room`: Main entry for meetings.
- `admit-user` / `deny-user`: Waiting room management.
- `chat-message`: Real-time messaging.
- `start-screen-share` / `stop-screen-share`: WebRTC orchestration.
- `promote-cohost` / `demote-cohost`: Role management.
