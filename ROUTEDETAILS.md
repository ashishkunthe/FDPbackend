## 📡 API Routes

### 🔐 Authentication

#### Register

```
POST /auth/register
```

**Body:**

```json
{
  "username": "John",
  "email": "john@example.com",
  "password": "12345678"
}
```

---

#### Login

```
POST /auth/login
```

**Body:**

```json
{
  "email": "john@example.com",
  "password": "12345678"
}
```

---

### 👥 User Management (Admin Only)

> Requires Authorization Header:
> `Authorization: Bearer <token>`

---

#### Get All Users

```
GET /users
```

---

#### Get User by ID

```
GET /users/:id
```

---

#### Update User Role

```
PATCH /users/:id/role
```

**Body:**

```json
{
  "changedrole": "ANALYST",
  "status": "ACTIVE"
}
```

---

### 💰 Financial Records

> Requires Authorization Header

---

#### Create Record (Admin Only)

```
POST /records
```

**Body:**

```json
{
  "amount": 5000,
  "type": "INCOME",
  "category": "Salary",
  "date": "2026-01-01",
  "notes": "Monthly salary"
}
```

---

#### Get All Records

```
GET /records
```

---

#### Update Record (Admin Only)

```
PATCH /records/:id
```

---

#### Delete Record (Admin Only)

```
DELETE /records/:id
```

---

### 📊 Dashboard

> Requires Authorization Header

---

#### Get Summary

```
GET /dashboard/summary
```

**Response:**

```json
{
  "totalIncome": 50000,
  "totalExpense": 30000,
  "netBalance": 20000
}
```

---
