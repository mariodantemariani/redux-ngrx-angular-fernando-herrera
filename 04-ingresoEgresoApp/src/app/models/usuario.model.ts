export class Usuario {
  constructor(
    public uid: string,
    public nombre: string,
    public email: string
  ) {}

  static fromFirebase({ uid, nombre, email }: any): Usuario {
    return new Usuario(uid, nombre, email);
  }
}
