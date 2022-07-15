export class User {


  _id: string;
  username: string;
  name: string;
  password: string;
  role: string;
  WebSocket: string;



  constructor(User?: Partial<User>) {
    this._id = User?._id;
    this.name = User?.name;
    this.username = User?.username,
    this.password = User?.password,
    this.role = User?.role
    this.WebSocket = User?.WebSocket
  }
}
