# SayMyTask — AI-Powered Voice Reminder System

Live Demo: https://say-my-task.vercel.app/

---

## Table of Contents
1. [Project Overview](#project-overview)
2. [Features](#features)
3. [Tech Stack](#tech-stack)
4. [Architecture & Workflow](#architecture--workflow)
5. [Setup & Installation](#setup--installation)
6. [Usage](#usage)
7. [Authentication & Security](#authentication--security)
8. [Testing & Performance](#testing--performance)
9. [Contributions](#contributions)
10. [License](#license)

---

## Project Overview
SayMyTask is an **AI-powered multilingual voice reminder application** that helps users manage daily tasks efficiently. Users can create, edit, delete, and schedule tasks which are delivered as natural human-like voice notifications. The app integrates **MyMemory API** for multilingual support and **ElevenLabs TTS** for realistic voice alerts.

---

## Features
- Create, edit, delete, and schedule tasks  
- Multilingual voice notifications using TTS  
- Secure authentication using **JWT (HTTP-only cookies)**  
- Google OAuth and email verification support  
- Real-time task scheduling using cron jobs  
- Centralized error handling and input validation  
- Optimized backend performance using Node.js perf hooks

---

## Tech Stack
- **Frontend:** React.js (Hooks, Router, Context API), Tailwind CSS, HTML5, CSS3  
- **Backend:** Node.js, Express.js, RESTful APIs  
- **Database:** MongoDB, Mongoose  
- **Authentication:** JWT, Google OAuth, Email verification, HTTP-only Cookies  
- **AI & APIs:** ElevenLabs TTS, MyMemory API  
- **Testing:** Jest, Supertest  
- **Deployment:** Vercel (Frontend), Render (Backend)

---

## Architecture & Workflow
1. User authentication via JWT/Google OAuth  
2. Task creation, editing, deletion, and scheduling  
3. Scheduled tasks trigger TTS voice notifications via ElevenLabs API  
4. Multilingual support through MyMemory API translation  
5. Backend APIs handle validation, sanitization, and error management  
6. Frontend consumes APIs, displays task dashboard, and plays reminders

---

## Setup & Installation
1. Clone the repository:  
```bash
git clone https://github.com/ankit11556/SayMyTask.git

Install backend dependencies:
cd backend
npm install

Install frontend dependencies:
cd frontend
npm install

Run backend:
npm run dev

Run frontend:
npm run dev


 Usage

-Sign up / Login

Create new tasks and set schedule

Receive AI-powered voice reminders at the scheduled time

Edit or delete tasks as needed


 Authentication & Security

JWT with HTTP-only cookies for session management

Google OAuth login integration

Email verification for account activation

Input validation & sanitization on all API routes


Testing & Performance

API testing with Jest and Supertest

Backend performance optimization using Node.js perf hooks

Error handling with central middleware


Contributions

Contributions are welcome!

Fork the repository

Create a new branch for your feature/fix

Commit your changes

Push and create a pull request


License

MIT License © Ankit
