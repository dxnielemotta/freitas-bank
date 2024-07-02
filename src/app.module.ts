import { Module } from '@nestjs/common';

// import { ClienteService } from './cliente/cliente.service';
// import { ContaService } from './conta/conta.service';
// import { ClienteController } from './cliente/cliente.controller';
// import { ContaController } from './conta/conta.controller';
// import { GerenteController } from './gerente/gerente.controller';
// import { GerenteService } from './gerente/gerente.service';
import { ClienteModule } from './cliente/cliente.module';
import { GerenteModule } from './gerente/gerente.module';
import { ContaModule } from './conta/conta.module';

@Module({
  imports: [ClienteModule, GerenteModule, ContaModule],
  // controllers: [ClienteController, ContaController, GerenteController],
  // providers: [ClienteService, ContaService, GerenteService],
})
export class AppModule {}
