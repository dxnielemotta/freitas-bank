import { Module } from '@nestjs/common';

import { ClienteModule } from './cliente/cliente.module';
import { GerenteModule } from './gerente/gerente.module';
import { ContaModule } from './conta/conta.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [ClienteModule, GerenteModule, ContaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
