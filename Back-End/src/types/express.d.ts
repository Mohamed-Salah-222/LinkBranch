import { JwtPayload as BaseJwtPayload } from "jsonwebtoken";

// Extend the Express Request interface
declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload;
    }
  }
}

// Define your custom JWT payload type
export interface JwtPayload extends BaseJwtPayload {
  id: string;
  email?: string;
  // Add any other properties your JWT payload contains
}
