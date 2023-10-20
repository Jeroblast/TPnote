import OrderNew from "../../model/entity/orders.orm-entity";
import { CreateOrderDtoInterface } from "../../model/dto/create-order.dto.interface";
import { OrderRepositoryInterface } from "../../port/order.repository.interface";
import { OrderStatusEnum } from "../../model/const/order-status.enum";

export default class CreateOrderService {
    constructor(
        private readonly ordersRepository: OrderRepositoryInterface,
    ) {
    }

    async createOrder(createOrderDto: CreateOrderDtoInterface): Promise<OrderNew> {

       const orderToCreate = {
           ...createOrderDto,
            status: OrderStatusEnum.InCart
        };

        const orderToSave =  this.ordersRepository.create(orderToCreate) as OrderNew;
        return await this.ordersRepository.save(orderToSave);

    }
}