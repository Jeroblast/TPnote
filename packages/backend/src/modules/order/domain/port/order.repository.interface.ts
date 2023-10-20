import { RepositoryInterface } from '@src/modules/shared/domain/port/db/repository.interface';
import OrderNew from '../model/entity/orders.orm-entity';

export interface OrderRepositoryInterface extends RepositoryInterface {
  findAllOrders(): Promise<OrderNew[]>;
  findOrdersBeforeDate(createdAt: Date): Promise<OrderNew[]>;
  findOrdersAfterDate(createdAt: Date): Promise<OrderNew[]>;
  findOrdersCustomers(customerName: string): Promise<OrderNew[]>;
  findOneById(orderId: string): Promise<OrderNew>;
} 