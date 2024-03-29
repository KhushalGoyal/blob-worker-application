import { NextFunction, Request, Response } from 'express';
import { ErrorResponse } from './Response';

function errorMiddleware(error: ErrorResponse, request: Request, response: Response, next: NextFunction) {
  const status = error.status || 500;
  const message = error.message || 'Something went wrong';
  const errors = error.errors || []
  response
    .status(status)
    .send({
      message,
      status,
      errors
    });
}

export default errorMiddleware;