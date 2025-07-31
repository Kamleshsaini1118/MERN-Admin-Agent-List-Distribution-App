# MERN Admin & Agent List Distribution App

## Overview

This is a full-stack MERN (MongoDB, Express, React, Node.js) application for **Admin user login**, **Agent management**, and **CSV list upload & distribution** among agents. It features a modern UI with Tailwind CSS and toast notifications for all actions.

---

## Features

- **Admin Registration & Login** (JWT authentication)
- **Add Agents** (Name, Email, Mobile, Password)
- **Upload CSV/XLSX/XLS List** (FirstName, Phone, Notes)
- **Validation** for file type and format
- **Automatic Distribution** of list items among agents (equal & sequential)
- **View Distributed Lists** for each agent (only 5-7 items shown per agent)
- **Modern UI** with Tailwind CSS
- **Toast Notifications** for all actions

---

## Tech Stack

- **Frontend:** React.js (Vite), Tailwind CSS, Axios, React Toastify
- **Backend:** Node.js, Express.js, MongoDB, Mongoose, Multer, JWT, csvtojson
- **Database:** MongoDB

---

## Folder Structure

```
ass_machine_test/
├── backend/
│ ├── controllers/ # Business logic for auth, agent, list
│ │ ├── agentController.js
│ │ ├── authController.js
│ │ └── listController.js
│ ├── middleware/
│ │ └── auth.js # JWT auth middleware
│ ├── models/ # Mongoose models
│ │ ├── Agent.js
│ │ ├── AssignedList.js
│ │ └── User.js
│ ├── routes/ # API routes
│ │ ├── agentRoutes.js
│ │ ├── authRoutes.js
│ │ └── listRoutes.js
│ ├── uploads/ # Uploaded CSV files (temp)
│ ├── .env # Environment variables
│ ├── server.js # Express server entry point
│ └── package.json
└── frontend/
├── public/
├── src/
│ ├── components/ # React components
│ │ ├── AgentForm.jsx
│ │ ├── AgentList.jsx
│ │ ├── Dashboard.jsx
│ │ ├── DistributedLists.jsx
│ │ ├── Login.jsx
│ │ ├── Register.jsx
│ │ └── UploadList.jsx
│ ├── App.jsx
│ ├── index.css
│ └── main.jsx
├── tailwind.config.js # Tailwind CSS config
└── package.json
```

---

## ⚙️ Installation & Setup

### Backend

1. Go to backend folder:
    ```sh
    cd backend
    npm install
    ```
2. Create a `.env` file:
    ```
    MONGO_URI=mongodb://localhost:27017/ass_machine_test
    JWT_SECRET=your_jwt_secret
    PORT=3000
    ```
3. Make sure `uploads/` folder exists in `backend/` for file uploads.
4. Start backend server:
    ```sh
    npm start
    ```

### Frontend

1. Go to frontend folder:
    ```sh
    cd frontend
    npm install
    ```
2. Start frontend (Vite):
    ```sh
    npm run dev
    ```

---

## Usage Flow

1. **Register Admin:**  
   - On first load, register a new admin user.
   - After registration, login with the same credentials.

2. **Login:**  
   - Enter admin email and password to access dashboard.

3. **Dashboard:**  
   - Add agents (Name, Email, Mobile, Password).
   - Upload a CSV/XLSX/XLS file with columns: FirstName, Phone, Notes.
   - File is validated and distributed among agents.
   - View distributed lists for each agent (only 5-7 items shown per agent).

4. **Logout:**  
   - Click logout to end session.

---

## CSV Format Example

| FirstName | Phone      | Notes      |
|-----------|------------|------------|
| John      | 9876543210 | Important  |
| Alice     | 9123456789 | Follow up  |
| ...       | ...        | ...        |

---

## API Endpoints

### Auth

- `POST /api/auth/register` — Register admin
- `POST /api/auth/login` — Login admin

### Agents

- `POST /api/agents` — Add agent (auth required)
- `GET /api/agents` — List agents (auth required)

### Lists

- `POST /api/lists/upload` — Upload list file (auth required, file field: `file`)
- `GET /api/lists` — Get distributed lists (auth required)

---

## Troubleshooting

- **File upload errors:**  
  - Ensure `uploads/` folder exists and is writable.
  - Only `.csv`, `.xlsx`, `.xls` files are accepted.
  - Check backend logs for error details.

- **MongoDB connection errors:**  
  - Check `MONGO_URI` in `.env`.
  - Ensure MongoDB is running.

- **Frontend not connecting:**  
  - Ensure backend is running on `PORT=3000`.
  - Update API URLs if running on a different port.

---

## Author

Kamlesh Saini

---

## License

MIT
