import { Module } from '@nestjs/common';

import { DomainModule } from './domain/domain.module';
import { ApplicationModule } from './application/application.module';
import { InfrastructureModule } from './infrastructure/infrastructure.module';

import { TypeOrmModule } from '@nestjs/typeorm';
import { Gerente } from './domain/entities/gerente.entity';
import { Cliente } from './domain/entities/cliente.entity';
import { Conta } from './domain/entities/conta.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      database: 'freitas_bank',
      username: 'postgres',
      password: 'postgres',
      entities: [Cliente, Gerente, Conta],
      synchronize: true,
    }),
    DomainModule,
    ApplicationModule,
    InfrastructureModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
