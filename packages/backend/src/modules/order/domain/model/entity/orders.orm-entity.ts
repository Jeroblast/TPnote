import { OrderStatusEnum } from '@src/modules/order/domain/model/const/order-status.enum';
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity('orders')
export default class OrderNew {
  @PrimaryGeneratedColumn('uuid')
  id: string;
 
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @Column({ name: 'status', default: OrderStatusEnum.InCart })
  status: string;

  @Column({ name: 'customer' })
  customer: string;

  @Column({ name: 'products', type: 'json', nullable: true })
  products: string[];
}
