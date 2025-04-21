# FoodChain AI - Frontend

## Firebase Authentication Setup

This project uses Firebase for Google authentication.

### Setup Steps

1. Create a `.env` file in the root of the frontend directory with the following content:

```
VITE_FIREBASE_API_KEY="your-api-key"
VITE_FIREBASE_AUTH_DOMAIN="your-auth-domain"
VITE_FIREBASE_PROJECT_ID="your-project-id"
VITE_FIREBASE_STORAGE_BUCKET="your-storage-bucket"
VITE_FIREBASE_MESSAGING_SENDER_ID="your-messaging-sender-id"
VITE_FIREBASE_APP_ID="your-app-id"
VITE_FIREBASE_MEASUREMENT_ID="your-measurement-id"
```

2. Install dependencies:

```
npm install
```

3. Run the development server:

```
npm run dev
```

## Authentication Flow

- New users will be directed to the signup page
- Existing users can sign in using Google authentication
- Protected routes will redirect to the signup page if not authenticated 