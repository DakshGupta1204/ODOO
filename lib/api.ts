import { 
  SignUpRequest, 
  SignInRequest, 
  ForgotPasswordRequest, 
  ResetPasswordRequest, 
  AuthResponse, 
  ApiError 
} from '@/types/auth';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000';

class ApiErrorClass extends Error {
  status: number;
  detail?: string;

  constructor(message: string, status: number, detail?: string) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.detail = detail;
  }
}

// Helper function to get auth token from localStorage
const getAuthToken = (): string | null => {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('auth_token');
};

async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {},
  requiresAuth = false
): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;
  
  const defaultHeaders: HeadersInit = {
    'Content-Type': 'application/json',
  };

  // Add authorization header if required
  if (requiresAuth) {
    const token = getAuthToken();
    if (token) {
      defaultHeaders['Authorization'] = `Bearer ${token}`;
    }
  }

  const config: RequestInit = {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
  };

  try {
    const response = await fetch(url, config);
    
    if (!response.ok) {
      let errorMessage = 'An error occurred';
      let errorDetail = '';
      
      try {
        const errorData = await response.json();
        errorMessage = errorData.message || errorData.detail || `HTTP ${response.status}`;
        errorDetail = errorData.detail || '';
      } catch {
        errorMessage = `HTTP ${response.status} - ${response.statusText}`;
      }
      
      throw new ApiErrorClass(errorMessage, response.status, errorDetail);
    }

    return await response.json();
  } catch (error) {
    if (error instanceof ApiErrorClass) {
      throw error;
    }
    
    // Handle network errors
    throw new ApiErrorClass(
      'Network error. Please check your connection and try again.',
      0
    );
  }
}

export const authApi = {
  async signUp(data: SignUpRequest): Promise<AuthResponse> {
    return apiRequest<AuthResponse>('/api/auth/signup', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  async signIn(data: SignInRequest): Promise<AuthResponse> {
    return apiRequest<AuthResponse>('/api/auth/signin', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  async forgotPassword(data: ForgotPasswordRequest): Promise<{ message: string }> {
    return apiRequest<{ message: string }>('/api/auth/forgot-password', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  async resetPassword(data: ResetPasswordRequest): Promise<{ message: string }> {
    return apiRequest<{ message: string }>('/api/auth/reset-password', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },
};

export { ApiErrorClass };
