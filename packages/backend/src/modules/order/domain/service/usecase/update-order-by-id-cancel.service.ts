import {OrderStatusEnum} from "@src/modules/order/domain/model/const/order-status.enum";
import {Exception} from "@src/modules/shared/domain/service/util/exception/exceptions.service";
import {ExceptionTypeEnum} from "@src/modules/shared/domain/const/exception-type.enum";
import OrderNew from "../../model/entity/orders.orm-entity";
import { OrderRepositoryInterface } from "../../port/order.repository.interface";

export default class UpdateOrderStatusToCancelService {
    constructor(private readonly ordersRepository: OrderRepositoryInterface) {
    }

    async updateOrderStatusToCancel(orderId: string): Promise<OrderNew> {
        //test if orderId is correctUUID format
        const isUUID = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;
        
        if (!isUUID.test(orderId)) {
            throw new Exception(ExceptionTypeEnum.NotFound,'Invalid orderId');
        }

        const order = await this.ordersRepository.findOneById(orderId);

        if (!order) {
            throw new Exception(ExceptionTypeEnum.NotFound, `Order with id ${orderId} not found`);
        }

        order.status = OrderStatusEnum.Paid;
        return await this.ordersRepository.save(order);

    }
}