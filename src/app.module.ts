import { Module } from '@nestjs/common';

import { ClienteModule } from './cliente/cliente.module';
import { GerenteModule } from './gerente/gerente.module';
import { ContaModule } from './conta/conta.module';

@Module({
  imports: [ClienteModule, GerenteModule, ContaModule],
})
export class AppModule {}
