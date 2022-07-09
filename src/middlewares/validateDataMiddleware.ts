import { Request, Response, NextFunction } from "express";
import { AppError } from "../errors/AppError.js";

export default function validateDataMiddleware(schema) {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body, { abortEarly: false });

    if (error) {
      const errors = error.details.map((error) => error.message);
      throw new AppError("Validation failed", 400, errors);
    }

    next();
  };
}

