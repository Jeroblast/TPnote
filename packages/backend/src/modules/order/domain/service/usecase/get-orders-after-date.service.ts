import OrderNew from '../../model/entity/orders.orm-entity';
import { OrderRepositoryInterface } from '../../port/order.repository.interface';

export default class GetOrderAfterService {
  constructor(private readonly orderRepository: OrderRepositoryInterface) {}

  async getOrdersAfterDate(createdAt: string): Promise<OrderNew[]> {
    const newDate = new Date(createdAt)
    const order = await this.orderRepository.findOrdersAfterDate(newDate);
    return order;
  }

}