import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientesService } from './cliente/cliente.service';
import { ClientesController } from './cliente/cliente.controller';
import { ContaService } from './conta/conta.service';
import { ContaController } from './conta/conta.controller';

@Module({
  imports: [],
  controllers: [AppController, ClientesController, ContaController],
  providers: [AppService, ClientesService, ContaService],
})
export class AppModule {}
