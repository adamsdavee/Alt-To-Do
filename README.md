# 📝 Todo App (Node.js + Express + MongoDB)

## 🚀 How to Use

### 1️⃣ Login (Landing Page)

- The application landing page is **`/login`**
- Visit `http://localhost:3000/login` to get started or
- Visit `http://localhost:3000/register`

### 2️⃣ Register / Login

- Create an account or log in
- Authentication is handled automatically using cookies

### 2️⃣ Create a Task

- Enter a task title
- Click **Add Task**

### 3️⃣ Update Task Status

- Use the dropdown to mark a task as:
   - `Pending`
   - `Completed`
   - `Deleted`

### 4️⃣ Logout

- Click the **Logout** button to end your session

---

## 🔗 Important Routes

| Action      | Method | Route              |
| ----------- | ------ | ------------------ |
| Login       | POST   | `/api/auth/login`  |
| Logout      | POST   | `/api/auth/logout` |
| View tasks  | GET    | `/api/todos/tasks` |
| Create task | POST   | `/tasks`           |
| Update task | PATCH  | `/tasks/:id`       |

---
