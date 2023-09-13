import { NextFunction, Request, Response } from "express";

export function redirectMiddleware(req: Request, res: Response, next: NextFunction) {
   if (!req.secure) {
      return res.redirect("https://" + req.headers.host + req.url);
   }
   next();
}
