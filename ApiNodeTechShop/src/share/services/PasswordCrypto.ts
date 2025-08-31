import { compare, hash } from "bcryptjs";
import { genSalt } from "bcryptjs";

const SALT_RANDOMS = 8;

const hashPassword = async (password: string) => {
  const saltGenerated = await genSalt(SALT_RANDOMS);
  return await hash(password, saltGenerated);
};

const verifyPassWord = async (password: string, hashPassword: string) => {
  return await compare(password, hashPassword);
};

export const passwordCrypto = {
  hashPassword,
  verifyPassWord,
};