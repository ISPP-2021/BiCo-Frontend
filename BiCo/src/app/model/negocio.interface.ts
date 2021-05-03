import { Servicio } from './service.interface';

export interface Negocio {
  id?: Number;
  name?: String;
  address?: String;
  businessType?: String;
  automatedAccept?: boolean;
  openTime?: Date;
  closeTime?: Date;
  supplier?: {
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
  option?: {
    id?: Number;
    automatedAccept?: boolean;
    gas?: Number;
    defaultDeposit?: Number;
    depositTimeLimit?: Number;
    new?: boolean;
  };
  services?: Array<Servicio>
}
