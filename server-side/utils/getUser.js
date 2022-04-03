import dotenv from "dotenv";
import jsonwebtoken from "jsonwebtoken";

dotenv.config();

export const getUser = (token) => {
  if (token) {
    try {
      // return the user information from the token
      return jsonwebtoken.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      console.log(err);
      // if there's a problem with the token, throw an error
      throw new Error("Session invalid");
    }
  }
};
