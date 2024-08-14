import { Module } from '@nestjs/common';

import { DomainModule } from './domain/domain.module';
import { ApplicationModule } from './application/application.module';
import { InfrastructureModule } from './infrastructure/infrastructure.module';

import { TypeOrmModule } from '@nestjs/typeorm';
import { Gerente } from './domain/entities/gerente.entity';
import { Cliente } from './domain/entities/cliente.entity';
import { Conta } from './domain/entities/conta.entity';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env.database'],
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT) || 5432,
      database: process.env.DB_NAME,
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
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
