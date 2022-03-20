import md5 from "md5";

export const gravatar = (email) => {
  return `https://www.gravatar.com/avatar/${md5(email)}.jpg?d=identicon`;
};
