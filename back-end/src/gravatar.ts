const md5 = require("md5");

export const gravatar = (email: string) => {
  return `https://www.gravatar.com/avatar/${md5(email)}.jpg?d=identicon`;
};
