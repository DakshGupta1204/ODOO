# API Integration Setup

This application is now integrated with the backend authentication APIs. Here's what has been implemented:

## Features Implemented

### 🔐 Authentication System
- **Sign Up**: Create new user accounts with first name, last name, email, and password
- **Sign In**: Authenticate existing users
- **Forgot Password**: Send password reset emails
- **Reset Password**: Reset password using token from email
- **Logout**: Clear authentication data and redirect to auth page

### 🛡️ Security & Validation
- **Form Validation**: Client-side validation for all forms
- **Input Sanitization**: Proper input handling and validation
- **Error Handling**: Comprehensive error handling with user-friendly messages
- **Token Management**: Secure JWT token storage and management

### 🎯 User Experience
- **Toast Notifications**: Real-time feedback for user actions
- **Loading States**: Loading indicators during API calls
- **Protected Routes**: Automatic redirection for unauthenticated users
- **Auth State Management**: Global authentication state using React Context

## API Endpoints

All endpoints use the prefix `/api/auth`:

### Sign Up
```
POST /api/auth/signup
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "securepassword",
  "first_name": "John",
  "last_name": "Doe"
}
```

### Sign In
```
POST /api/auth/signin
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "securepassword"
}
```

### Forgot Password
```
POST /api/auth/forgot-password
Content-Type: application/json

{
  "email": "user@example.com"
}
```

### Reset Password
```
POST /api/auth/reset-password
Content-Type: application/json

{
  "token": "reset_token_from_email",
  "new_password": "newpassword123"
}
```

## Configuration

### Environment Variables
Create a `.env.local` file in the root directory:

```env
# API Configuration
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000

# For production, update to your actual API domain
# NEXT_PUBLIC_API_BASE_URL=https://your-api-domain.com
```

### Backend Requirements
Your backend server should:
1. Run on the specified API base URL (default: http://localhost:8000)
2. Handle CORS for your frontend domain
3. Return JSON responses in the expected format
4. Support the authentication endpoints listed above

## File Structure

```
├── app/
│   ├── auth/page.tsx              # Authentication page (sign in/up)
│   ├── reset-password/page.tsx    # Password reset page
│   ├── home/page.tsx             # Protected home page
│   └── layout.tsx                # Root layout with providers
├── lib/
│   ├── api.ts                    # API utility functions
│   ├── auth-context.tsx          # Authentication context
│   ├── toast-context.tsx         # Toast notification system
│   └── use-form-validation.ts    # Form validation hook
├── types/
│   └── auth.ts                   # TypeScript types
└── .env.local                    # Environment configuration
```

## Usage

### Protected Routes
Any page that requires authentication should use the `useAuth` hook:

```tsx
import { useAuth } from '@/lib/auth-context';

export default function ProtectedPage() {
  const { user, isAuthenticated, isLoading } = useAuth();
  
  if (isLoading) return <div>Loading...</div>;
  if (!isAuthenticated) {
    // Redirect happens automatically in layout
    return null;
  }
  
  return <div>Welcome, {user?.first_name}!</div>;
}
```

### Making Authenticated API Calls
For future API endpoints that require authentication:

```tsx
import { apiRequest } from '@/lib/api';

// This will automatically include the Bearer token
const data = await apiRequest<ResponseType>('/api/protected-endpoint', {
  method: 'GET'
}, true); // true = requires authentication
```

### Toast Notifications
Show user feedback:

```tsx
import { useToast } from '@/lib/toast-context';

const { showToast } = useToast();

// Success message
showToast('Operation completed successfully!', 'success');

// Error message
showToast('Something went wrong', 'error');

// Warning
showToast('Please check your input', 'warning');

// Info
showToast('Just so you know...', 'info');
```

## Testing the Integration

1. **Start your backend server** on http://localhost:8000 (or update the environment variable)
2. **Run the frontend**: `npm run dev`
3. **Test the flows**:
   - Create a new account (sign up)
   - Sign in with existing credentials
   - Test forgot password (check email)
   - Test password reset with token
   - Verify protected route access

## Error Handling

The application handles various error scenarios:
- **Network errors**: Connection issues, server down
- **Validation errors**: Invalid input data
- **Authentication errors**: Invalid credentials, expired tokens
- **Server errors**: 500+ status codes
- **Client errors**: 400+ status codes

All errors are displayed to users via toast notifications with appropriate messaging.

## Next Steps

1. **Email Templates**: Ensure your backend sends properly formatted password reset emails
2. **CORS Configuration**: Configure your backend to allow requests from your frontend domain
3. **Rate Limiting**: Implement rate limiting on your backend API endpoints
4. **SSL/HTTPS**: Use HTTPS in production for secure token transmission
5. **Token Refresh**: Consider implementing refresh tokens for better security
6. **User Profile Management**: Add endpoints for updating user profiles
7. **Email Verification**: Add email verification functionality

## Troubleshooting

### Common Issues

1. **CORS Errors**: Ensure your backend allows requests from your frontend domain
2. **Token Issues**: Check that tokens are being stored and sent correctly
3. **Environment Variables**: Verify `.env.local` is properly configured
4. **Network Errors**: Confirm your backend server is running and accessible

### Debug Mode
Enable debug mode by adding this to your `.env.local`:
```env
NODE_ENV=development
```

This will log additional information to the browser console.
