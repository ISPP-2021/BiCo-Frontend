export interface Supplier {
  id?: Number;
  name?: String;
  lastname?: String;
  dni?: String;
  email?: String;
  user?: {
    username?: String;
    password?: String;
    enabled?: boolean;
    authorities?: {
      id?: Number;
      authority?: String;
      new?: boolean;
    };
  };
  business: {
    id: Number;
    name: String;
    address: String;
    businessType: String;
    automatedAccept: boolean;
    option: {
      id: Number;
      automatedAccept: boolean;
      limitAutomated: Number;
      defaultDeposit: Number;
      depositTimeLimit: Number;
      new?: boolean;
    }
    services: {
      id: Number;
      name: String;
      description: String;
      price: Number;
      duration: Number;
      capacity: Number;
      deposit: Number
      tax: Number;
      business: Number;
      bookings: {
        emisionDate: Date;
        bookDate: Date;
        status: String;

      }
      new?: boolean;

    }
    new?: boolean;
  }
  new?: boolean;
}
