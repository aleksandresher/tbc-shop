import jwt, { JwtPayload } from "jsonwebtoken";

const secret = process.env.JWT_SECRET || "";

export const decodeToken = (token: string): JwtPayload | null => {
  try {
    return jwt.verify(token, secret) as JwtPayload;
  } catch (err) {
    console.error("Failed to decode token:", err);
    return null;
  }
};
