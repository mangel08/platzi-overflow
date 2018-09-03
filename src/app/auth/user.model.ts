export class User {
  constructor(
    public email: string,
    public password: String,
    public firstName?: string,
    public lastName?: string
   ) { }

  // Metodos de la clase
  fullName() {
    return `${this.firstName} ${this.lastName}`;
  }

}