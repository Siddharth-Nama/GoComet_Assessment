# 🚀 Setup & Deployment Guide

## Prerequisites
*   Python 3.10+
*   Node.js 18+
*   PostgreSQL Database (Local or Supabase)

## Backend Setup (Django)
1.  **Navigate to backend**:
    ```bash
    cd backend
    ```
2.  **Install Dependencies**:
    ```bash
    pip install -r requirements.txt
    ```
3.  **Configure Environment**:
    Create a `.env` file in `backend/` with your DB credentials:
    ```ini
    DB_NAME=postgres
    DB_USER=postgres
    DB_PASSWORD=your_password
    DB_HOST=db.your_project.supabase.co
    ```
4.  **Run Migrations**:
    ```bash
    python manage.py migrate
    ```
5.  **Start Server**:
    ```bash
    python manage.py runserver
    ```

## Frontend Setup (React)
1.  **Navigate to frontend**:
    ```bash
    cd frontend
    ```
2.  **Install Dependencies**:
    ```bash
    npm install
    ```
3.  **Start Dev Server**:
    ```bash
    npm run dev
    ```
