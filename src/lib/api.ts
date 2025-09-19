const API_BASE = process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:8080'

export interface ApiResponse<T = any> {
  data: T
  status: number
}

export interface ApiError {
  response?: {
    data?: {
      error?: {
        code: string
        message: string
        details?: any[]
      }
    }
    status: number
  }
  message: string
}

class ApiClient {
  private baseURL: string

  constructor(baseURL: string) {
    this.baseURL = baseURL
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const url = `${this.baseURL}/api${endpoint}`

    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      ...options,
    }

    try {
      const response = await fetch(url, config)
      const data = await response.json()

      if (!response.ok) {
        const error: ApiError = {
          response: {
            data,
            status: response.status,
          },
          message: data?.error?.message || 'Request failed',
        }
        throw error
      }

      return {
        data,
        status: response.status,
      }
    } catch (error: any) {
      if (error instanceof Error && !('response' in error)) {
        const apiError: ApiError = {
          message: error.message,
        }
        throw apiError
      }
      throw error
    }
  }

  async get<T>(endpoint: string): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: 'GET' })
  }

  async post<T>(endpoint: string, data?: any): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined,
    })
  }

  async put<T>(endpoint: string, data?: any): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'PUT',
      body: data ? JSON.stringify(data) : undefined,
    })
  }

  async delete<T>(endpoint: string): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: 'DELETE' })
  }
}

export const api = new ApiClient(API_BASE)
