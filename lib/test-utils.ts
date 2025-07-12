/**
 * API Integration Test Utilities
 * 
 * These utilities help test the API integration without a full backend.
 * Use them in development to simulate API responses.
 */

// Mock API responses for testing
export const mockApiResponses = {
  signUp: {
    success: {
      access_token: "mock_jwt_token_signup",
      token_type: "bearer",
      user: {
        id: "mock-user-id-1",
        email: "test@example.com",
        first_name: "John",
        last_name: "Doe",
        created_at: new Date().toISOString(),
        is_verified: false
      }
    },
    error: {
      message: "Email already exists",
      status: 400
    }
  },
  
  signIn: {
    success: {
      access_token: "mock_jwt_token_signin",
      token_type: "bearer",
      user: {
        id: "mock-user-id-1",
        email: "test@example.com",
        first_name: "John",
        last_name: "Doe",
        created_at: "2025-01-01T00:00:00Z",
        is_verified: true
      }
    },
    error: {
      message: "Invalid credentials",
      status: 401
    }
  },
  
  forgotPassword: {
    success: {
      message: "Password reset email sent successfully"
    },
    error: {
      message: "Email not found",
      status: 404
    }
  },
  
  resetPassword: {
    success: {
      message: "Password reset successfully"
    },
    error: {
      message: "Invalid or expired reset token",
      status: 400
    }
  }
};

// Mock API server for testing
export const createMockApiServer = (enableMocking = false) => {
  if (!enableMocking || typeof window === 'undefined') return;

  // Intercept fetch requests
  const originalFetch = window.fetch;
  
  window.fetch = async (url: RequestInfo | URL, init?: RequestInit) => {
    const urlString = url.toString();
    
    // Only mock our API endpoints
    if (!urlString.includes('/api/auth/')) {
      return originalFetch(url, init);
    }
    
    // Add delay to simulate network
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Parse the request
    const method = init?.method || 'GET';
    const body = init?.body ? JSON.parse(init.body as string) : null;
    
    // Route the mock responses
    if (urlString.includes('/api/auth/signup') && method === 'POST') {
      // Simulate email already exists error sometimes
      if (body?.email === 'existing@example.com') {
        return new Response(JSON.stringify(mockApiResponses.signUp.error), {
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        });
      }
      return new Response(JSON.stringify(mockApiResponses.signUp.success), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    if (urlString.includes('/api/auth/signin') && method === 'POST') {
      // Simulate invalid credentials error sometimes
      if (body?.password === 'wrongpassword') {
        return new Response(JSON.stringify(mockApiResponses.signIn.error), {
          status: 401,
          headers: { 'Content-Type': 'application/json' }
        });
      }
      return new Response(JSON.stringify(mockApiResponses.signIn.success), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    if (urlString.includes('/api/auth/forgot-password') && method === 'POST') {
      // Simulate email not found error sometimes
      if (body?.email === 'notfound@example.com') {
        return new Response(JSON.stringify(mockApiResponses.forgotPassword.error), {
          status: 404,
          headers: { 'Content-Type': 'application/json' }
        });
      }
      return new Response(JSON.stringify(mockApiResponses.forgotPassword.success), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    if (urlString.includes('/api/auth/reset-password') && method === 'POST') {
      // Simulate invalid token error sometimes
      if (body?.token === 'invalid_token') {
        return new Response(JSON.stringify(mockApiResponses.resetPassword.error), {
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        });
      }
      return new Response(JSON.stringify(mockApiResponses.resetPassword.success), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    // Default to original fetch for unhandled requests
    return originalFetch(url, init);
  };
  
  console.log('🚀 Mock API server enabled for testing');
  console.log('📝 Test credentials:');
  console.log('   Valid email: test@example.com');
  console.log('   Valid password: any password except "wrongpassword"');
  console.log('   Email that will fail signup: existing@example.com');
  console.log('   Password that will fail signin: wrongpassword');
  console.log('   Email that will fail forgot password: notfound@example.com');
  console.log('   Token that will fail reset: invalid_token');
};

// Test scenarios
export const testScenarios = {
  // Successful flows
  successfulSignUp: {
    email: 'newuser@example.com',
    password: 'password123',
    first_name: 'John',
    last_name: 'Doe'
  },
  
  successfulSignIn: {
    email: 'test@example.com',
    password: 'password123'
  },
  
  // Error scenarios
  duplicateEmailSignUp: {
    email: 'existing@example.com',
    password: 'password123',
    first_name: 'John',
    last_name: 'Doe'
  },
  
  invalidCredentialsSignIn: {
    email: 'test@example.com',
    password: 'wrongpassword'
  },
  
  emailNotFoundForgotPassword: {
    email: 'notfound@example.com'
  },
  
  invalidTokenReset: {
    token: 'invalid_token',
    new_password: 'newpassword123'
  }
};

// Enable mock API in development
if (process.env.NODE_ENV === 'development') {
  // Uncomment the line below to enable mocking (useful when backend is not ready)
  // createMockApiServer(true);
}
