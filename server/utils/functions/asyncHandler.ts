import { Request, Response, NextFunction } from "express";
import asyncHandler from "express-async-handler";

type HandleFunction = (req: Request, res: Response, next: NextFunction) => void;

export function asyncHandlerMap(handlers: Array<HandleFunction>) {
   const asyncHandlers: Array<HandleFunction> = handlers.map((handler) =>
      asyncHandler((req: Request, res: Response, next: NextFunction) => handler(req, res, next))
   );

   return asyncHandlers;
}
