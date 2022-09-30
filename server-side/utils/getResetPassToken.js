import crypto from "crypto";

export const getResetPassToken = () => {
  const resetToken = crypto.randomBytes(20).toString("hex");

  const resetPassToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  const resetPassExpire = Date.now() + 10 * 60 * 1000;

  return { resetPassToken, resetPassExpire };
};
