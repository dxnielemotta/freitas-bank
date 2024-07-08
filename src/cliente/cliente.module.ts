import { Module, forwardRef } from '@nestjs/common';

import { ClienteService } from './cliente.service';
import { GerenteModule } from 'src/gerente/gerente.module';
import { ClienteController } from './cliente.controller';

import { ContaModule } from 'src/conta/conta.module';

@Module({
  imports: [forwardRef(() => GerenteModule), forwardRef(() => ContaModule)],
  controllers: [ClienteController],
  providers: [ClienteService],
  exports: [ClienteService],
})
export class ClienteModule {}
