export interface OwnerBooking {
    id: Number;
    name: String;
    address: String;
    businessType: String;
    automatedAccept: boolean;
    supplier: {
        id: Number;
        name: String;
        lastname: String;
        dni: String;
        email: String;
    },


    option: {
        id: Number;
        automatedAccept: boolean;
        limitAutomated: Number;
        defaultDeposit: Number;
        depositTimeLimit: Number;
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
            servise: String;
        }
    }

}