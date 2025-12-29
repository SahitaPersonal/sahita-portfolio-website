import { Response } from 'express'
import { ApiResponse, PaginatedResponse, ApiError } from '../types/api'

export class ResponseUtil {
  static success<T>(res: Response, data: T, message?: string, statusCode: number = 200): Response {
    const response: ApiResponse<T> = {
      data,
      message,
      timestamp: new Date().toISOString()
    }
    return res.status(statusCode).json(response)
  }

  static paginated<T>(
    res: Response, 
    data: T[], 
    page: number, 
    limit: number, 
    total: number,
    message?: string
  ): Response {
    const totalPages = Math.ceil(total / limit)
    const response: PaginatedResponse<T> = {
      data,
      message,
      timestamp: new Date().toISOString(),
      pagination: {
        page,
        limit,
        total,
        totalPages
      }
    }
    return res.status(200).json(response)
  }

  static error(res: Response, error: string, message?: string, statusCode: number = 500): Response {
    const response: ApiError = {
      error,
      message: message || error,
      timestamp: new Date().toISOString()
    }
    return res.status(statusCode).json(response)
  }

  static notFound(res: Response, resource: string = 'Resource'): Response {
    return this.error(res, 'Not Found', `${resource} not found`, 404)
  }

  static badRequest(res: Response, message: string = 'Bad Request'): Response {
    return this.error(res, 'Bad Request', message, 400)
  }

  static unauthorized(res: Response, message: string = 'Unauthorized'): Response {
    return this.error(res, 'Unauthorized', message, 401)
  }

  static forbidden(res: Response, message: string = 'Forbidden'): Response {
    return this.error(res, 'Forbidden', message, 403)
  }

  static internalError(res: Response, message: string = 'Internal Server Error'): Response {
    return this.error(res, 'Internal Server Error', message, 500)
  }
}