import jwt from "jsonwebtoken";
import { env } from "process";

class JWTService {
  private static readonly SECRET_KEY: string =
    env.JWT_SECRET || "your_fallback_secret";
  private static readonly EXPIRES_IN: number = 60 * 60;

  static generateToken(payload: object, expiresIn?: number): string {
    return jwt.sign(payload, this.SECRET_KEY, {
      expiresIn: expiresIn || this.EXPIRES_IN,
    });
  }

  static verifyToken<T>(token: string): T {
    return jwt.verify(token, this.SECRET_KEY) as T;
  }

  static decodeToken<T>(token: string): T | null {
    try {
      return jwt.decode(token) as T;
    } catch {
      return null;
    }
  }
}

export default JWTService;
