import { Negocio } from "./negocio.interface";
import { Servicio } from "./service.interface";

export interface Reserva {
  index?: Number
	emisionDate?: Date;
	bookDate?: Date;
	status?: String;
	negocio?:Negocio;
	service?:Servicio;
	servise?:string;
}
