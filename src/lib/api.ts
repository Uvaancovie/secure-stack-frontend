const DEFAULT_LOCAL = 'http://localhost:8080'
let API_BASE = process.env.NEXT_PUBLIC_API_BASE || DEFAULT_LOCAL

// In browser, log which API base was inlined at build time so deployed apps don't accidentally use localhost
if (typeof window !== 'undefined') {
  console.info('API base (build-time):', API_BASE)

  // If NEXT_PUBLIC_API_BASE fell back to localhost during build but we're running on a production origin,
  // attempt to auto-resolve to the obvious deployed backend host. This is a best-effort convenience only.
  try {
    const origin = window.location.origin
    // If the build-time base was localhost, but we are running on the production frontend domain,
    // prefer the Render backend URL that you provided.
    if (API_BASE === DEFAULT_LOCAL && origin === 'https://secure-stack-frontend.vercel.app') {
      API_BASE = 'https://secure-stack-backend.onrender.com'
      console.info('API base overridden at runtime for production frontend:', API_BASE)
    }
  } catch (e) {
    // ignore
  }
}

// Always expose the final API base used at runtime for easier debugging
if (typeof window !== 'undefined') console.info('API base (final):', API_BASE)

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
