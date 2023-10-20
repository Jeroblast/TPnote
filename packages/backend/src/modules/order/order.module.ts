import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import OrderRepository from '@src/modules/order/infrastructure/repository/order.repository';
import OrderController from '@src/modules/order/presentation/controller/order.controller';
import GetAllOrderService from './domain/service/usecase/get-all-orders.service';
import { OrderRepositoryInterface } from './domain/port/order.repository.interface';
import GetOrderBeforeService from './domain/service/usecase/get-orders-before-date.service';
import GetOrderAfterService from './domain/service/usecase/get-orders-after-date.service';
import OrderNew from './domain/model/entity/orders.orm-entity';
import GetOrderCustomersService from './domain/service/usecase/get-orders-customer.service';

@Module({
  imports: [TypeOrmModule.forFeature([OrderNew])],
  controllers: [OrderController],
  providers: [
    {
      provide: 'OrderRepositoryInterface',
      useClass: OrderRepository,
    },

    {
      provide: GetAllOrderService,
      useFactory: (orderRepository: OrderRepositoryInterface) => {
        return new GetAllOrderService(orderRepository);
      },
      inject: ['OrderRepositoryInterface'],
    },

    {
      provide: GetOrderBeforeService,
      useFactory: (orderRepository: OrderRepositoryInterface) => {
        return new GetOrderBeforeService(orderRepository);
      },
      inject: ['OrderRepositoryInterface'],
    },

    {
      provide: GetOrderAfterService,
      useFactory: (orderRepository: OrderRepositoryInterface) => {
        return new GetOrderAfterService(orderRepository);
      },
      inject: ['OrderRepositoryInterface'],
    },

    {
      provide: GetOrderCustomersService,
      useFactory: (orderRepository: OrderRepositoryInterface) => {
        return new GetOrderCustomersService(orderRepository);
      },
      inject: ['OrderRepositoryInterface'],
    },

]})
export default class OrderModule {}

