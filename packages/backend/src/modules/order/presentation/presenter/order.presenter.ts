import { OrderStatusEnum } from '../../domain/model/const/order-status.enum';
import OrderNew from '../../domain/model/entity/orders.orm-entity';

export class OrderPresenter {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  status: keyof typeof OrderStatusEnum;
  customer: string;
  products: string[];

  constructor(order: OrderNew) {
    this.id = order.id;
    this.createdAt = order.createdAt;
    this.updatedAt = order.updatedAt;
    //this.status = order.status;
    this.customer = order.customer;
    this.products = order.products
  }
}