
import axiosInstance from '@/lib/axios';

const API_URL = 'https://cydex-backend-production-edd3.up.railway.app';

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  role: 'CUSTOMER' | 'ADMIN' | 'RIDER' | 'VENDOR';
  password_confirmation: string;
}

export interface AuthResponse {
  token: string;
  user: {
    id: string;
    first_name: string;
    last_name: string;
    email: string;
    role: string;
  };
}

class AuthService {
  private static instance: AuthService;
  private token: string | null = null;

  private constructor() {
    // Initialize token from localStorage if available
    this.token = localStorage.getItem('token');
  }

  public static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService();
    }
    return AuthService.instance;
  }

  private getAuthHeader() {
    return this.token ? { Authorization: `Bearer ${this.token}` } : {};
  }

  private handleError(error: any): never {
    if (error.response?.data?.message) {
      throw new Error(error.response.data.message);
    } else if (error.message) {
      throw new Error(error.message);
    } else {
      throw new Error('An unexpected error occurred');
    }
  }

  public async login(credentials: LoginCredentials): Promise<AuthResponse> {
    try {
      const response = await axiosInstance.post('/auth/login', credentials);
      const data = response.data as AuthResponse;
      
      this.token = data.token;
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      
      return data;
    } catch (error) {
      this.handleError(error);
    }
  }

  public async register(data: RegisterData): Promise<AuthResponse> {
    try {
      const response = await axiosInstance.post('/auth/register', data);
      const responseData = response.data as AuthResponse;
      
      this.token = responseData.token;
      localStorage.setItem('token', responseData.token);
      localStorage.setItem('user', JSON.stringify(responseData.user));
      
      return responseData;
    } catch (error) {
      this.handleError(error);
    }
  }

  public async resetPassword(email: string): Promise<void> {
    try {
      await axiosInstance.post('/auth/otp/send', { email });
    } catch (error) {
      this.handleError(error);
    }
  }

  public async changePassword(email: string, code: string, password: string): Promise<void> {
    try {
      await axiosInstance.post('/auth/change-password', {
        email,
        code,
        password
      });
    } catch (error) {
      this.handleError(error);
    }
  }

  public async verifyEmail(email: string): Promise<void> {
    try {
      await axiosInstance.post('/auth/email-verification', { email });
    } catch (error) {
      this.handleError(error);
    }
  }

  public logout(): void {
    this.token = null;
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }

  public getCurrentUser() {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      return JSON.parse(userStr);
    }
    return null;
  }

  public isAuthenticated(): boolean {
    return !!this.token;
  }

  public getToken(): string | null {
    return this.token;
  }
}

export default AuthService;
