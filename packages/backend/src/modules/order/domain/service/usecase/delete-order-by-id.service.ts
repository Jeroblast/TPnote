import { Exception } from '@src/modules/shared/domain/service/util/exception/exceptions.service';
import { ExceptionTypeEnum } from '@src/modules/shared/domain/const/exception-type.enum';
import { OrderRepositoryInterface } from '../../port/order.repository.interface';

export class DeleteOrderByIdService {
  constructor(private readonly orderRepository: OrderRepositoryInterface) {}

  async deleteOrderById(id: string): Promise<void> {
    const order = await this.orderRepository.findOneById(id);

    if (!order) {
      throw new Exception(ExceptionTypeEnum.NotFound, `Order with this id  ${id} not found`);
    }

    await this.orderRepository.delete({ id: id });
  }
}