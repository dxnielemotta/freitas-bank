import { Module, forwardRef } from '@nestjs/common';

import { ClienteService } from './cliente.service';
import { GerenteModule } from 'src/gerente/gerente.module';
import { ClienteController } from './cliente.controller';

@Module({
  imports: [forwardRef(() => GerenteModule)],
  controllers: [ClienteController],
  providers: [ClienteService],
  exports: [ClienteService],
})
export class ClienteModule {}
