import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClienteService } from './cliente/cliente.service';
import { ClienteController } from './cliente/cliente.controller';
import { ContaService } from './conta/conta.service';
import { ContaController } from './conta/conta.controller';

@Module({
  imports: [],
  controllers: [AppController, ClienteController, ContaController],
  providers: [AppService, ClienteService, ContaService],
})
export class AppModule {}
