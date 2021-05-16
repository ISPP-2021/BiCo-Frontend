import { Negocio } from "./negocio.interface";
import { Servicio } from "./service.interface";

export interface Reserva {
  id?: Number
	emisionDate?: Date;
	bookDate?: Date;
	status?: String;
	negocio?:Negocio;
	service?:Servicio;
	servise?:string;
}
