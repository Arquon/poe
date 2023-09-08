import { Request, Response, NextFunction } from "express";
import { HttpError } from "http-errors";

export function errorHandler(error: any, req: Request, res: Response, next: NextFunction) {
   if (error instanceof HttpError) {
      const { status, message } = error;
      res.status(status).json({ message });
      return;
   }

   console.log(error);
   res.status(500).json({ message: "Ошибка сервера" });
}
