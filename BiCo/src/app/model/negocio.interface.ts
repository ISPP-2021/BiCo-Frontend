export interface Negocio {
  id?: Number;
  name?: String;
  address?: String;
  businessType?: String;
  option?:{
    automatedAccept?: boolean
    limitAutomated?: Number
    defaultDeposit?: Number
    depositTimeLimit?: Number
  }
  services?:{
    id?: Number;
    name?: String
    description?: String
    price?: Number
    duration?: Number
    capacity?: Number
    deposit?: Number
    tax?: Number
    bookings?:{
      emisionDate?: Date
      bookDate?: Date
      status?: String
    }
  }

}
