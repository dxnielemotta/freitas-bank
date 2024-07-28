import { Module } from '@nestjs/common';

import { ClienteModule } from './cliente/cliente.module';
import { GerenteModule } from './gerente/gerente.module';
import { ContaModule } from './conta/conta.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Gerente } from './gerente/gerente.entity';
import { Cliente } from './cliente/cliente.entity';
import { Conta } from './conta/conta.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      database: 'freitas-bank',
      username: 'postgres',
      password: 'postgres',
      entities: [Cliente, Gerente, Conta],
      synchronize: true,
    }),
    ClienteModule,
    GerenteModule,
    ContaModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
