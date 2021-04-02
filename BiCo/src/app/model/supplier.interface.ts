export interface Supplier {
  id: Number;
  name: String;
  lastname: String;
  dni: String;
  email: String;
  user: {
    username: String;
    password: String;
    enabled: boolean;
    authotiries: {
      id: Number;
      authority: String;
      new: boolean;
    };
  };
  new: boolean;
}
