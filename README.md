# Mortgage Calculator Project

This project is a **Mortgage Calculator** divided into two applications: a **backend (server)** and a **frontend (client)**. The backend, built in Node.js, handles mortgage payment calculations, and the frontend, built with React, provides the user interface. The estimated development time was **4 hours and 30 minutes**, with a stronger focus on the frontend logic and functionality, and minimal attention to CSS styling.

## Table of Contents

- [Technologies Used](#technologies-used)
- [Prerequisites](#prerequisites)
- [Project Setup](#project-setup)
  - [Server](#server)
  - [Client](#client)
- [Focus and Details](#focus-and-details)
- [Additional Notes](#additional-notes)

---

## Technologies Used

### Backend (Server)

- **Node.js** and **Express**: To create a REST API that handles mortgage payment calculations.
- **TypeScript**: For static typing to enhance code maintainability.
- **Axios**: Used in the frontend for HTTP requests to the backend.
- **Cors**: Middleware to enable communication between the frontend and backend.

### Frontend (Client)

- **React** (with **Vite** for fast project setup): To build a Single Page Application (SPA).
- **React Hook Form** and **Yup**: For form management and validation in the frontend.
- **React Query**: To handle data mutation when calculating the mortgage.
- **Tailwind CSS**: For quick and consistent styling.
- **TypeScript**: For static typing and better code readability.

## Prerequisites

- **Node.js** (version 14 or higher)
- **npm** (version 6 or higher) or **yarn**
- **Vite** and **TypeScript** installed globally (optional for advanced configuration)

## Project Setup

### Server

1. Navigate to the server folder:
   ```bash
   cd server
