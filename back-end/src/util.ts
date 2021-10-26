import { ContextType } from "src/types";
import { MiddlewareFn } from "type-graphql";

const jwt = require("jsonwebtoken");

export const getToken = (id: any) => {
  const token = jwt.sign(id, process.env.JWT_SECRET, {
    expiresIn: 604800, // 1 Week
  });
  return token;
};

export const getPayload = (token: any) => {
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    return { loggedIn: true, payload };
  } catch (err) {
    // Add Err Message
    return { loggedIn: false };
  }
};

export const getUserId = (token: string) => {
  if (token) {
    // return the user information from the token
    return jwt.verify(token, process.env.JWT_SECRET);
  } else {
    // if there's a problem with the token, throw an error
    throw new Error("Invalid token");
  }
};
