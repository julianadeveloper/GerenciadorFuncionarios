import * as bcrypt from 'bcrypt';

export class Criptography {
  static async encodePwd(password: string) {
    return await bcrypt.hash(password, 10);
  }

  /**
   * metodo para descripritografararasd a senha
   * @param password senha do usuario
   * @param compare senha do banco
   */
  static async decode(password: string, compare: string) {
    return await bcrypt.compare(password, compare);
  }
}
