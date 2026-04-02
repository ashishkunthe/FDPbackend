# 📊 Finance Dashboard Backend

## 🚀 Overview

This project is a backend system for managing financial records with role-based access control. It is designed to simulate a real-world finance dashboard where different users interact with data based on their permissions.

The system focuses on clean API design, proper data handling, and secure access control.

---

## 🧠 Features

### 🔐 Authentication & Authorization

* User registration and login using JWT
* Password hashing using bcrypt
* Role-based access control (RBAC)

### 👤 User Roles

* **Viewer** → Can view records and summaries
* **Analyst** → Can view data and insights
* **Admin** → Full access (manage users and records)

---

## 👥 User Management (Admin Only)

* Get all users
* Get user by ID
* Update user role
* (Optional) Update user status

---

## 💰 Financial Records

### Fields:

* Amount
* Type (INCOME / EXPENSE)
* Category
* Date
* Notes
* CreatedBy

### APIs:

* Create record (Admin)
* Get all records (All roles)
* Update record (Admin)
* Delete record (Admin)

---

## 📊 Dashboard Summary

### Endpoint:

`GET /dashboard/summary`

### Returns:

* Total Income
* Total Expense
* Net Balance

---

## 🛠️ Tech Stack

* Node.js
* Express
* MongoDB + Mongoose
* TypeScript
* JWT (Authentication)
* bcrypt (Password hashing)
* Zod (Validation)

---

## ⚙️ Project Structure

```
src/
 ├── routes/
 ├── controllers/
 ├── models/
 ├── middleware/
 ├── types/
 ├── index.ts
```

---

## 🔑 Environment Variables

Create a `.env` file:

```
PORT=3000
JWT_SECRET=your_secret_key
MONGO_URI=your_mongodb_connection
```

---

## ▶️ Setup & Run

```bash
npm install
npm run dev
```

---

## 🔐 Access Control Logic

* All protected routes require JWT token
* Admin-only routes are restricted via middleware
* Role validation ensures correct access permissions

---

## ⚠️ Assumptions

* Admin user is seeded manually in the database
* New users are registered as `VIEWER` by default
* Only admins can assign roles

---

## 📌 Notes

This project focuses on backend design, data modeling, and access control rather than production-level optimizations.

---

## ✨ Future Improvements

* Filtering and pagination
* Category-wise analytics
* Trend-based insights
* API documentation (Swagger)
* Unit and integration testing

---

## 🧾 Conclusion

This backend demonstrates:

* Clean API structure
* Proper role-based access control
* Scalable data modeling
* Practical backend engineering approach

---
