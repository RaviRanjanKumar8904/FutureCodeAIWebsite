# FutureCodeAI EdTech Platform

FutureCodeAI is a cutting-edge EdTech platform built to democratize tech education. It provides students, coaching institutes, and administrators with a comprehensive portal to explore courses, apply for internships, verify certificates, and manage enrollments.

The platform is engineered for a premium user experience, utilizing a modern tech stack and high-end 3D visual assets.

## Tech Stack
- **Frontend Framework:** React 19 + TypeScript
- **Build Tool:** Vite 8
- **Styling:** Tailwind CSS + Framer Motion (for animations)
- **3D Graphics:** Three.js + React Three Fiber + React Three Drei
- **Backend & Database:** Firebase (Authentication, Firestore, Storage)
- **Form Handling:** React Hook Form + Zod
- **SEO:** React Helmet Async

## Prerequisites
- Node.js (v18 or higher recommended)
- A Firebase project (for Auth, Firestore, and Storage)

## Setup & Local Development

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Environment Variables**
   This project relies on Firebase. You must provide your Firebase configuration keys.
   Copy the example environment file:
   ```bash
   cp .env.example .env
   ```
   Open `.env` and fill in the values from your Firebase Console (Project Settings -> General -> Your apps).
   **Important:** Never commit your `.env` file to version control.

3. **Start the Development Server**
   ```bash
   npm run dev
   ```
   The app will be available at `http://localhost:5173`.

## Build & Deploy

This project is configured as a Single Page Application (SPA).

1. **Production Build**
   To create an optimized production build:
   ```bash
   npm run build
   ```
   This will run `tsc -b` for type checking, followed by `vite build`. Vite is configured with manual chunking to ensure optimal load times for heavy dependencies like Three.js and Firebase.

2. **Deployment (Vercel)**
   The project includes a `vercel.json` file pre-configured for SPA routing.
   - Connect your GitHub repository to Vercel.
   - Add the environment variables (`VITE_FIREBASE_*`) in the Vercel project settings.
   - Deploy! Vercel will automatically detect the Vite build configuration.

3. **Linting**
   To check for code issues:
   ```bash
   npm run lint
   ```
   This project uses `oxlint` for blazingly fast linting.

## Firebase Configuration
Ensure your Firestore and Storage security rules are correctly configured according to the `firestore.rules` and `storage.rules` files included in the repository. These rules utilize Role-Based Access Control (RBAC) to distinguish between `student`, `institute`, and `admin` roles.
