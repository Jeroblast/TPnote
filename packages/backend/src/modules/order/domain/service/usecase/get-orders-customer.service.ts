import OrderNew from '../../model/entity/orders.orm-entity';
import { OrderRepositoryInterface } from '../../port/order.repository.interface';

export default class GetOrdersCustomersService {
  constructor(private readonly orderRepository: OrderRepositoryInterface) {}

  async getOrdersCustomers(customersName: string): Promise<OrderNew[]> {
    // Vérifie si le nom du customer est valide selon les conditions
    if (customersName.length <= 5 && !/\d/.test(customersName)) {
      throw new Error("Le nom du customer n'est pas valide.");
    }

    const order = await this.orderRepository.findOrdersCustomers(customersName);

    return order;
  }

}