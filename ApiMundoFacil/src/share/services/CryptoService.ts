import { compare, hash } from "bcryptjs";
import { genSalt } from "bcryptjs";

const SALT_RANDOMS = 8;
export class CryptoService {
  async hashText(password: string) {
    const saltGenerated = await genSalt(SALT_RANDOMS);
    return await hash(password, saltGenerated);
  }
  async verifyText(password: string, hashPassword: string) {
    return await compare(password, hashPassword);
  }
}
