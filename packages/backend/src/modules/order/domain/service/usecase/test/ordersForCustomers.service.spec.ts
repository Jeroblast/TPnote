import GetOrdersCustomersService from "../get-orders-customer.service";

 describe('Get All Orders For A Given Customer', () => {

    it('Should return orders if the customer name is valid', async () => {

         const orderdMock = [{
            id : 1,
         }]

        const orderRepositoryMock = {
            findOrdersCustomers: () =>  orderdMock
        };
        

        const getOrdersCustomersService = new GetOrdersCustomersService(orderRepositoryMock);
        const returnValue = await getOrdersCustomersService.getOrdersCustomers('pepopp');
        expect(returnValue).toEqual(orderdMock);        

     });


    it('Should return an error if the customer name is invalid', async () => {

        const orderdMock = [{
            id : 1,
         }]

         const orderRepositoryMock = {
            findOrdersCustomers: () =>  orderdMock         
         };

        const getOrdersCustomersService = new GetOrdersCustomersService(orderRepositoryMock);

         await expect(getOrdersCustomersService.getOrdersCustomers('pap')).rejects.toThrow("Le nom du customer n'est pas valide.");

     })

 });    