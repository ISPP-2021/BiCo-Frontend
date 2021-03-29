export interface Negocio {
    id: Number;
    name: String;
    address: String;
    businessType: String;
    option:{
      automatedAccept: boolean
      limitAutomated: Number
      defaultDeposit: Number
      depositTimeLimit: Number
    }

  }
