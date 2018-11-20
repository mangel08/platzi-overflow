export class User {
  constructor(
    public email: string,
    public password: String,
    public firstName?: string,
    public lastName?: string,
    public _id?: string
   ) { }

  // Metodos de la clase
  fullName() {
    return `${this.firstName} ${this.lastName}`;
  }

}