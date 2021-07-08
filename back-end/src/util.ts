import {secret} from './constants';

const jwt = require("jsonwebtoken");

export const getToken = (payload: any) => {
  const token = jwt.sign(payload.toJSON(), secret, {
      expiresIn: 604800, // 1 Week
  })
  return token
}

export const getPayload = (token: any) => {
  try {
      const payload = jwt.verify(token, secret);
      return { loggedIn: true, payload };
  } catch (err) {
      // Add Err Message
      return { loggedIn: false }
  }
}