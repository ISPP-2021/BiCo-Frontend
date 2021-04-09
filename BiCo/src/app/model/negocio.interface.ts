export interface Negocio {
  id: Number;
  name: String;
  address: String;
  businessType: String;
  automatedAccept: boolean;
  supplier: {
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
  };
  option: {
    id: Number;
    automatedAccept: boolean;
    limitAutomated: Number;
    defaultDeposit: Number;
    depositTimeLimit: Number;
    new: boolean;
  };
  services: {
    id: Number;
    name: String;
    description: String;
    price: Number;
    duration: Number;
    capacity: Number;
    deposit: Number;
    tax: Number;
    business?: String;
    bookings: {
      id: Number;
      emisionDate: Date;
      bookDate: Date;
      status: String;
      servise: String;
      new: boolean;
    };
  };
}
