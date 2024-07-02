import { Module, forwardRef } from '@nestjs/common';
import { ClienteController } from './cliente.controller';
import { ClienteService } from './cliente.service';
import { GerenteModule } from 'src/gerente/gerente.module';

@Module({
  imports: [forwardRef(() => GerenteModule)],
  controllers: [ClienteController],
  providers: [ClienteService],
  exports: [ClienteService],
})
export class ClienteModule {}
