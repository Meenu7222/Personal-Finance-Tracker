# Personal Finance Tracker

**Personal Finance Tracker** is a full-stack application to track income and expenses, visualize spending patterns with charts, and provide simple forecasted trends using a linear regression model implemented on the Node.js backend.

- Frontend: React (no Tailwind)
- Charts: Chart.js
- Backend: Node.js + Express
- Database: PostgreSQL (or SQLite for local dev)
- Model: Simple Linear Regression (Node implementation / npm package)

---

## Features

- User authentication (optional placeholder)
- Add / Edit / Delete transactions (income & expense)
- Categorize transactions (default + custom categories)
- Dashboard: balance, monthly summary, recent transactions
- Charts: line chart, pie chart, bar chart (Chart.js)
- Analytics: linear regression forecasting for future expense/income
- Export/Import CSV (optional)
- Responsive UI

---




---

## Quick start (local)

### Prerequisites
- Node.js (v16+ recommended)
- npm or yarn
- PostgreSQL (or SQLite for simpler local usage)

### 1) Backend

```bash
cd backend
# install
npm install

# create .env (example)
# PORT=5000
# DATABASE_URL=postgres://user:password@localhost:5432/finance_db
# JWT_SECRET=your_jwt_secret

# run (dev)
npm run dev
# or
node server.js
