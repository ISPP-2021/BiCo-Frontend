export interface Supplier {
  id?: Number;
  name?: String;
  lastname?: String;
  dni?: String;
  email?: String;
  user?: {
    username?: String;
    password?: String;
    token?: String;
    enabled?: boolean;
    authorities?: {
      id?: Number;
      authority?: String;
      new?: boolean;
    };
  };
  new?: boolean;
}
