import { Body, Controller, Get, Param, Patch, Delete, Post } from '@nestjs/common';
import GetAllOrderService from '../../domain/service/usecase/get-all-orders.service';
import GetOrderBeforeService from '../../domain/service/usecase/get-orders-before-date.service';
import GetOrderAfterService from '../../domain/service/usecase/get-orders-after-date.service';
import OrderNew from '../../domain/model/entity/orders.orm-entity';
import GetOrderCustomersService from '../../domain/service/usecase/get-orders-customer.service';
import path from 'path';
import UpdateOrderStatusToPaidService from '../../domain/service/usecase/update-order-by-id-paid.service';
import UpdateOrderStatusToCancelService from '../../domain/service/usecase/update-order-by-id-cancel.service';
import { DeleteOrderByIdService } from '../../domain/service/usecase/delete-order-by-id.service';
import CreateOrderService from '../../domain/service/usecase/create-order.service';

@Controller('/orders')
export default class OrderController {

constructor(
    private readonly getAllOrderService: GetAllOrderService,
    private readonly getOrderBeforeService: GetOrderBeforeService,
    private readonly getOrderAfterService: GetOrderAfterService,
    private readonly getOrderCustomersService: GetOrderCustomersService,
    private readonly updateOrderStatusToPaidService: UpdateOrderStatusToPaidService,
    private readonly updateOrderStatusToCancelService: UpdateOrderStatusToCancelService,
    private readonly deleteOrderByIdService: DeleteOrderByIdService,
    private readonly createOrderService: CreateOrderService

  ) {}

  @Get('/all-order')
  async getAllOrder(): Promise<OrderNew[]> {

    return await this.getAllOrderService.getAllOrders();
  }

  @Get('/before/:createAt')
  async getAllOrdersBeforeDate(@Param('createdAt') createdAt: string): Promise<OrderNew[]> {
    return await this.getOrderBeforeService.getOrdersBeforeDate(createdAt);
  }
  

  @Get('/after/:createAt')
  async getAllOrdersAfterDate(@Param('createdAt') createdAt: string): Promise<OrderNew[]> {
    return await this.getOrderAfterService.getOrdersAfterDate(createdAt);
  }

  @Get('/by-customer/:customers')
  async getOrdersCustomers(@Param('customers') customers: string): Promise<OrderNew[]> {
    return await this.getOrderCustomersService.getOrdersCustomers(customers);
  }

  @Patch('/:orderId/pay/')
    async updateOrderStatusToPaid(@Param('orderId') orderId: string): Promise<OrderNew> {
        return await this.updateOrderStatusToPaidService.updateOrderStatusToPaid(orderId);
    }

    @Patch('/:orderId/cancel/')
    async updateOrderStatusToCancel(@Param('orderId') orderId: string): Promise<OrderNew> {
        return await this.updateOrderStatusToCancelService.updateOrderStatusToCancel(orderId);
    }

    @Delete('/:orderId/delete')
    async deleteOrderById(@Param('orderId') orderId: string): Promise<void> {
      return await this.deleteOrderByIdService.deleteOrderById(orderId);
    }

    @Post()
    async createOrder(@Body() createOrderDto: CreateOrderDto) {
        await this.createOrderService.createOrder(createOrderDto);
    }
}