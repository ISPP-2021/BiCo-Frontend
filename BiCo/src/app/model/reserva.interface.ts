export interface Reserva {
    id: Number;
    emisionDate: Date;
    bookDate: Date;
    status: boolean;
    consumer:{
        name: String
        lastName: String
        email: String
        dni: String
        user: {
            username: String
            password: String
        }
      }
    services: [{
        name: String
        description: String
        price: Number
        duration: Number
        capacity: Number
        deposit: Number
        tax: Number
      }]

}