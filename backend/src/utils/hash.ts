import bcrypt from "bcryptjs";

/**
 * Hash a plain text password
 */
export const hashPassword = async (password: string): Promise<string> => {
  const salt = await bcrypt.genSalt(12); // security: 12 rounds
  return bcrypt.hash(password, salt);
};

/**
 * Compare plain password with hash
 */
export const verifyPassword = async (
  password: string,
  hash: string
): Promise<boolean> => {
  return bcrypt.compare(password, hash);
};
