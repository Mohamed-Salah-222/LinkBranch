import { type Request, type Response, type NextFunction } from "express";

export type ExpressHandler = (req: Request, res: Response, next: NextFunction) => void | Promise<void>;
