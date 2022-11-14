import { Request, Response, NextFunction } from "express"
import { ApplicationError } from "@/Main/Error/ApplicationError"
import { DomainError } from "@/Main/Error/DomainError"

export const internalServerMiddleware = (
  err: Error,
  request: Request,
  response: Response,
  next: NextFunction
) => {
  if (err instanceof ApplicationError || err instanceof DomainError) {
    return response.status(err.statusCode).json({ message: err.message })
  }

  return response.status(500).json({
    status: "error",
    message: `Internal server error - ${err.message}`,
  })
}
