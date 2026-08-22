import crypto from "crypto";

export const generateTemporaryPassword = () => {
  return crypto.randomBytes(6).toString("base64url");
};