import { Negocio } from "./negocio.interface";
import { Servicio } from "./service.interface";

export interface Reserva {
  index?: Number
	bookDate?: String;
	status?: String;
	negocio?:Negocio;
	service?:Servicio;
	servise?:string;
}
