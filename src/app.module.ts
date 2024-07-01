import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientesService } from './cliente/cliente.service';
import { ClientesController } from './cliente/cliente.controller';

@Module({
  imports: [],
  controllers: [AppController, ClientesController],
  providers: [AppService, ClientesService],
})
export class AppModule {}
