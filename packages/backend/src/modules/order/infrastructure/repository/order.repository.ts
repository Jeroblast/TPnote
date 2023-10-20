import { DataSource, Repository } from 'typeorm';
import { InjectDataSource } from '@nestjs/typeorm';
import OrderNew from '../../domain/model/entity/orders.orm-entity';
import { OrderRepositoryInterface } from '../../domain/port/order.repository.interface';

export default class OrderRepository extends Repository<OrderNew> implements OrderRepositoryInterface {
  constructor(
    @InjectDataSource()
    private readonly datasource: DataSource,
  ) {
    super(OrderNew, datasource.createEntityManager());
  }

  async findAllOrders(): Promise<OrderNew[]> {
    const query = this.createQueryBuilder('Order');
    return await query.getMany();
  }

  async findOrdersBeforeDate(createdAt: Date): Promise<OrderNew[]> {
    const query = this.createQueryBuilder('Order');

    query.where(`order.createdAt < :date`, {date: createdAt });

    return await query.getMany();
  }

  async findOrdersAfterDate(createdAt: Date): Promise<OrderNew[]> {
    const query = this.createQueryBuilder('Order');

    query.where('order.createdAt > :Date', {createdAt});

    return await query.getMany();
  }

  async findOrdersCustomers(customerName: string): Promise<OrderNew[]> {
    const query = this.createQueryBuilder('Order');

    query.where('order.customerName < 5', {customerName});

    return await query.getMany();
  }

     async findOneById(orderId: string): Promise<OrderNew>{
      const query = this.createQueryBuilder('Order');

      query.where('order.update = newOrder', {orderId});

      return await query.getOne();

    }



}
