import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { configValidationSchema } from './config/env/config.schema';
import { DatabaseModule } from '@src/modules/database/database.module';

import MentoringSlotModule from '@src/modules/mentoring-slot/mentoring-slot.module';
import SharedModule from '@src/modules/shared/shared.module';
import OrderModule from '../test/spec/order/get/order.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env'],
      validationSchema: configValidationSchema,
      isGlobal: true,
    }),
    DatabaseModule,
    MentoringSlotModule,
    SharedModule,
    OrderModule
  ],
})
export default class AppModule {}
