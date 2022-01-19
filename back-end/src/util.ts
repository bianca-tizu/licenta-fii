const jwt = require("jsonwebtoken");

export const getToken = (id: any) => {
  const today = new Date();
  const exp = new Date(today);
  exp.setDate(today.getDate() + 60);

  const token = jwt.sign(id, process.env.JWT_SECRET, {
    expiresIn: exp.getTime() / 1000,
  });
  return token;
};

export const getPayload = (token: any) => {
  try {
    const payload = jwt.verify(token.slice(7), process.env.JWT_SECRET);
    return { loggedIn: true, payload };
  } catch (err) {
    // Add Err Message
    return { loggedIn: false };
  }
};

export const getUserId = (token: string) => {
  if (token) {
    // return the user information from the token
    return jwt.verify(token.slice(7), process.env.JWT_SECRET);
  } else {
    // if there's a problem with the token, throw an error
    throw new Error("Invalid token");
  }
};
