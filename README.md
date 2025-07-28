# 🐾 PetPals – Pet Adoption Platform

A **MERN stack** platform that connects people with pets for adoption, allows creating **donation campaigns**, and manages **adoption requests** with a fully responsive UI.

---

## 🚀 Live URLs

- **Client:** [Live Link](https://pet-adoption-tailwag.surge.sh/)
---

## ✨ Key Features

✅ **Firebase Authentication + JWT** for secure login & role-based access  
✅ **Pet Listing with Infinite Scroll**  
✅ **Adoption Request System** with modal-based forms  
✅ **Donation Campaigns with Stripe Integration**  
✅ **User/Admin Dashboards** with protected routes  
✅ **Fully Responsive UI** with Tailwind CSS  
✅ **MongoDB + Express REST APIs**

---

## 🛠️ Tech Stack

### **Frontend**

- React 18
- React Router DOM
- @tanstack/react-query
- Firebase
- Axios
- Tailwind CSS
- SweetAlert2
- React Hook Form
- Headless UI
- Stripe React SDK

### **Backend**

- Node.js + Express
- MongoDB (No Mongoose)
- JSON Web Token (JWT)
- Stripe
- dotenv
- CORS

---

## ⚙️ Environment Variables

Create a `.env` file for **both client and server**:

### 🔹 Client `.env`

VITE_apiKey=your_firebase_api_key
VITE_authDomain=your_firebase_auth_domain
VITE_projectId=your_firebase_project_id
VITE_storageBucket=your_firebase_storage_bucket
VITE_messagingSenderId=your_firebase_sender_id
VITE_appId=your_firebase_app_id
VITE_SERVER_URL=https://server-roan-one.vercel.app

### 🔹 Server `.env`

PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
STRIPE_SECRET_KEY=your_stripe_secret_key
CLIENT_URL=http://localhost:5173

---

## 📦 Installation & Setup

### 🔹 Client

```bash
cd client
npm install
npm run dev

```

### 🔹 Server

cd server
npm install
npm start
