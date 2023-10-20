import OrderNew from '../../model/entity/orders.orm-entity';
import { OrderRepositoryInterface } from '../../port/order.repository.interface';

export default class GetAllOrderService {
  constructor(private readonly orderRepository: OrderRepositoryInterface) {}

  async getAllOrders(): Promise<OrderNew[]> {
    const order = await this.orderRepository.findAllOrders();

    console.log(order)
    return order;
  }

}