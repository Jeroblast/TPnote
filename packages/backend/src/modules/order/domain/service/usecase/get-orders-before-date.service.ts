import OrderNew from '../../model/entity/orders.orm-entity';
import { OrderRepositoryInterface } from '../../port/order.repository.interface';

export default class GetOrdersBeforeDateService {
  constructor(private readonly orderRepository: OrderRepositoryInterface) {}

  async getOrdersBeforeDate(createdAt: string): Promise<OrderNew[]> {
    const newDate = new Date(createdAt)
    const order = await this.orderRepository.findOrdersBeforeDate(newDate);
    return order;
  }

}