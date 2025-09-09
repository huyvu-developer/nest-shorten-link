// bcrypt.util.ts
import * as bcrypt from 'bcrypt';

export const hash = async (
  plainText: string,
  salt: string | number = 10,
): Promise<string> => {
  return bcrypt.hash(plainText, salt);
};

export const compare = async (
  plainText: string,
  hashed: string,
): Promise<boolean> => {
  return bcrypt.compare(plainText, hashed);
};
