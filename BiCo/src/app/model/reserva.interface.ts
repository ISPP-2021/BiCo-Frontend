import { Negocio } from "./negocio.interface";
import { Servicio } from "./service.interface";

export interface Reserva {
	emisionDate?: Date;
	bookDate?: Date;
	status?: String;
	negocio?:Negocio;
	service?:Servicio;
	servise?:string;
}
