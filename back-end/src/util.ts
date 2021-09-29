import { Request } from "express";
import { secret } from "./constants";

const jwt = require("jsonwebtoken");

export const getToken = (payload: any) => {
  const token = jwt.sign(payload.toJSON(), secret, {
    expiresIn: 604800, // 1 Week
  });
  return token;
};

export const getPayload = (token: any) => {
  try {
    const payload = jwt.verify(token, secret);
    return { loggedIn: true, payload };
  } catch (err) {
    // Add Err Message
    return { loggedIn: false };
  }
};

export const getUserId = (req: Request, token: string) => {
  if (req) {
    const authHeader = req.headers.authorization;
    if (authHeader) {
      const headerToken = authHeader.replace("Bearer ", "");
      if (!headerToken) {
        throw new Error("No token found");
      }
      const { payload } = getPayload(headerToken);
      return payload;
    }
  } else if (token) {
    const payload = getPayload(token);
    return payload;
  }

  throw new Error("Not authenthicated");
};
