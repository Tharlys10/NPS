import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors/AppError";
import jwt from "jsonwebtoken";

interface PayloadToken {
  user_id: string
}

export default function authenticating(request: Request, _: Response, _next: NextFunction) {
  // Gather the jwt access token from the request header
  const authHeader = request.headers['authorization']

  const token = authHeader && authHeader.split(' ')[1]

  if (token == null) throw new AppError("token jwt not provided", 401); // if there isn't any token

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET as string, (err: Error, payload: PayloadToken) => {
    // verification token invalid
    if (err) throw new AppError(err.message, 401);

    // verification token user id
    if (!payload.user_id) throw new AppError("user not provided", 401);

    request.user = {
      id: payload.user_id
    };

    _next();
  });

}