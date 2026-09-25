# Deployment Guide: IHFC Student Portal

## Backend Deployment (Node.js & Express + MongoDB)

1. **Environment Variables**: Set the following in your production environment:
   - `PORT`: (e.g. 5000)
   - `MONGO_URI`: Your MongoDB Atlas connection string.
   - `JWT_SECRET`: A secure random string for JWT.

2. **Hosting Platform**: (e.g. Heroku, Render, AWS, Vercel)
   - Set the root directory to `backend`.
   - Install dependencies: `npm install`
   - Start command: `node server.js`

## Frontend Deployment (React + Vite)

1. **Environment Variables**:
   - Ensure your API calls point to your production backend URL. You will need to update the `http://localhost:5000` calls to your deployed backend URL (or use environment variables).

2. **Hosting Platform**: (e.g. Vercel, Netlify)
   - Set the root directory to `frontend`.
   - Build command: `npm run build`
   - Output directory: `dist`
